import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private token;
  private httpOptions;
  private baseEndPoint = environment.apiBase;

  constructor(private http: HttpClient, private tokenService: NbTokenService) {
    tokenService.get()
      .subscribe((token: NbAuthJWTToken) => {
        this.token = token.isValid() ? token.getValue() : {};
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.token,
          }),
        };
      });
  }

  startTimer(project: number): Observable<any> {
    return this.http.post<any>(this.baseEndPoint + '/timer/', JSON.stringify({'project': project}),
      this.httpOptions);
  }

  getTimersByUser(id: number): Observable<any> {
    return this.http.get<any[]>(this.baseEndPoint + '/timers/user/' + id, this.httpOptions);
  }
}
