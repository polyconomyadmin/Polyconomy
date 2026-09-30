import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

/**
 * What's down, if anything:
 * - 'server':   the backend itself can't be reached, so we can't tell which part failed
 * - 'database': the backend is up but MongoDB isn't answering
 * - 'rag':      the backend is up but the RAG service isn't answering
 */
export type Outage = 'server' | 'database' | 'rag' | null;

interface HealthResponse {
  status: 'ok' | 'error';
  database?: 'ok' | 'down';
  rag?: 'ok' | 'down';
}

/**
 * Tracks whether the backend (Django, MongoDB and the RAG service) is
 * reachable. The app shell shows a maintenance popup while outage is set.
 */
@Injectable({ providedIn: 'root' })
export class HealthService {
  private API = 'https://polyconomy-74386831d29f.herokuapp.com/api';

  // Generous enough to ride out a Heroku dyno waking from sleep.
  private readonly TIMEOUT_MS = 20000;

  readonly outage = signal<Outage>(null);
  readonly checking = signal(false);

  // The AI being down doesn't raise a popup on load; we remember it and show the
  // popup only when the user tries to send a message (see sendMessage in the chats).
  readonly ragDown = signal(false);

  constructor(private http: HttpClient) {}

  /**
   * Calls /api/health/ and updates outage. An AI outage only raises the popup when
   * showRag is set (a message failed) or the AI popup is already showing (Try Again).
   * With showRag, the AI popup shows even if everything reports healthy, since the
   * user's message still failed.
   */
  check(showRag = false) {
    if (this.checking()) return;
    this.checking.set(true);
    this.http.get<HealthResponse>(`${this.API}/health/`).pipe(
      timeout(this.TIMEOUT_MS),
      // A 503 still carries the JSON body saying which part is down.
      catchError(err => of(err instanceof HttpErrorResponse ? (err.error as HealthResponse) : null))
    ).subscribe(res => {
      const outage = this.classify(res);
      this.checking.set(false);
      this.ragDown.set(res?.rag === 'down');
      if (outage === 'rag' && !showRag && this.outage() !== 'rag') {
        this.outage.set(null);
      } else if (outage === null && showRag) {
        this.outage.set('rag');
      } else {
        this.outage.set(outage);
      }
    });
  }

  /** Called when a chat query fails or stalls, so the popup shows mid-conversation too. */
  report(outage: Exclude<Outage, null>) {
    if (outage === 'rag') this.ragDown.set(true);
    this.outage.set(outage);
  }

  dismiss() {
    this.outage.set(null);
  }

  private classify(res: HealthResponse | string | null): Outage {
    if (typeof res !== 'object') res = null; // e.g. an HTML 404 page
    if (res?.status === 'ok') return null;
    // The database is the more fundamental failure, so it wins if both are down.
    if (res?.database === 'down') return 'database';
    if (res?.rag === 'down') return 'rag';
    return 'server';
  }
}
