import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8005/';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<R>(url: string, options?: any): Observable<R> {
    return this.http.get<R>(`${BASE_URL}${url}`, options) as Observable<R>;
  }

  post<R>(url: string, body: any, options?: any): Observable<R> {
    return this.http.post<R>(`${BASE_URL}${url}`, body, options) as Observable<R>;
  }

  put<R>(url: string, body: any, options?: any): Observable<R> {
    return this.http.put<R>(`${BASE_URL}${url}`, body, options) as Observable<R>;
  }

  delete<R>(url: string, options?: any): Observable<R> {
    return this.http.delete<R>(`${BASE_URL}${url}`, options) as Observable<R>;
  }
}
