import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
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

  getAllProject(): Observable<any> {
    return this.http.get<any[]>(this.baseEndPoint + '/projects', this.httpOptions).pipe(delay(100));
  }

  getProject(id: number): Observable<any> {
    return this.http.get<any>(this.baseEndPoint + '/project/' + id, this.httpOptions).pipe(delay(100));
  }

  addProject(project: any) {
    return this.http.post<any>(this.baseEndPoint + '/project/add', JSON.stringify(project), this.httpOptions);
  }

  updateProject(project: any) {
    return this.http.put<any>(this.baseEndPoint + '/project/' + project._id, JSON.stringify(project), this.httpOptions);
  }

  deleteProject(project: any) {
    return this.http.delete(this.baseEndPoint + '/project/' + project._id, {observe: 'response'});
  }
}
