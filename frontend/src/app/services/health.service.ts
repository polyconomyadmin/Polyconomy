import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

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

  constructor(private http: HttpClient) {}

  /** Calls /api/health/ and updates outage. */
  check() {
    if (this.checking()) return;
    this.checking.set(true);
    this.http.get<HealthResponse>(`${this.API}/health/`).pipe(
      timeout(this.TIMEOUT_MS),
      map(res => this.classify(res)),
      // A 503 still carries the JSON body saying which part is down.
      catchError(err => of(this.classify(err instanceof HttpErrorResponse ? err.error : null)))
    ).subscribe(outage => {
      this.checking.set(false);
      this.outage.set(outage);
    });
  }

  /** Called when a chat query fails or stalls, so the popup shows mid-conversation too. */
  report(outage: Exclude<Outage, null>) {
    this.outage.set(outage);
  }

  dismiss() {
    this.outage.set(null);
  }

  private classify(res: HealthResponse | null): Outage {
    if (res?.status === 'ok') return null;
    // The database is the more fundamental failure, so it wins if both are down.
    if (res?.database === 'down') return 'database';
    if (res?.rag === 'down') return 'rag';
    return 'server';
  }
}
