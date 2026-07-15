import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RagService {
  constructor(private http: HttpClient) {}

  queryRag(text: string) {
    return this.http.post<{ response: string }>(
      'https://polyconomy-ai-bf583cb75ac1.herokuapp.com/api/query/',
      { text },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

}
