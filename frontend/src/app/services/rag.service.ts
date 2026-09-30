// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class RagService {
//   constructor(private http: HttpClient) {}

//   queryRag(text: string) {
//     return this.http.post<{ response: string }>(
//       'https://polyconomy-74386831d29f.herokuapp.com/api/query/',
//       { text },
//       { headers: { 'Content-Type': 'application/json' } }
//     );
//   }

// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { switchMap, map, filter, take, timeout, catchError } from 'rxjs/operators';
import { HealthService } from './health.service';

interface SubmitResponse {
  task_id: string;
  status: string;
}

interface StatusResponse {
  status: 'pending' | 'done' | 'error';
  answer?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RagService {
  private readonly baseUrl = 'https://polyconomy-74386831d29f.herokuapp.com/api/query/';
  private readonly pollIntervalMs = 3000;
  // The backend waits on the RAG server indefinitely, so give up here instead of polling forever.
  private readonly maxWaitMs = 5 * 60 * 1000;

  constructor(private http: HttpClient, private health: HealthService) {}

  queryRag(text: string): Observable<{ response: string }> {
    return this.http.post<SubmitResponse>(
      this.baseUrl,
      { question: text },
      { headers: { 'Content-Type': 'application/json' } }
    ).pipe(
      switchMap(submitRes => this.pollStatus(submitRes.task_id)),
      map(answer => ({ response: answer })),
      timeout(this.maxWaitMs),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          // The request itself failed, so ask the health endpoint which part is down.
          this.health.check();
        } else {
          // The backend answered but the RAG query errored or never finished.
          this.health.report('rag');
        }
        return throwError(() => err);
      })
    );
  }

  private pollStatus(taskId: string): Observable<string> {
    return timer(0, this.pollIntervalMs).pipe(
      switchMap(() =>
        this.http.get<StatusResponse>(`${this.baseUrl}${taskId}/status/`)
      ),
      switchMap((data) => {
        if (data.status === 'done') {
          return [data.answer ?? ''];
        }
        if (data.status === 'error') {
          return throwError(() => new Error(data.answer || 'RAG query failed'));
        }
        return []; // still pending — keep polling
      }),
      filter((val): val is string => val !== undefined),
      take(1)
    );
  }
}