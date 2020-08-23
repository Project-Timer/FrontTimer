import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class HttpService {

  get apiBase(): string {
    return environment.apiBase;
    // return '';
  }

  constructor(private http: HttpClient) {}

  get(endpoint: string, options?): Observable<any> {
    return this.http.get(`${this.apiBase}/${endpoint}`, options);
  }

  post(endpoint: string, data, options?): Observable<any> {
    return this.http.post(`${this.apiBase}/${endpoint}`, data, options);
  }

  put(endpoint: string, data, options?): Observable<any> {
    return this.http.put(`${this.apiBase}/${endpoint}`, data, options);
  }

  delete(endpoint: string, options?): Observable<any> {
    return this.http.delete(`${this.apiBase}/${endpoint}`, options);
  }
}
