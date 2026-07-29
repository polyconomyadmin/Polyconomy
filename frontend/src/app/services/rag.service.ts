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
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { switchMap, map, filter, take } from 'rxjs/operators';

interface SubmitResponse {
  task_id: string;
}

interface StatusResponse {
  status: 'pending' | 'processing' | 'done' | 'error';
  answer?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RagService {
  private readonly baseUrl = 'https://polyconomy-74386831d29f.herokuapp.com/api/query/';
  private readonly pollIntervalMs = 3000;

  constructor(private http: HttpClient) {}

queryRag(text: string): Observable<{ response: string }> {
  return this.http.post<{ answer: string }>(
    this.baseUrl,
    { question: text },
    { headers: { 'Content-Type': 'application/json' } }
  ).pipe(
    map(res => ({ response: res.answer }))
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
        // still pending/processing — filter it out so we keep polling
        return [];
      }),
      // only "done" or an error passes through; keep listening otherwise
      filter((val): val is string => val !== undefined),
      take(1)
    );
  }
}