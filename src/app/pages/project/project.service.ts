import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';

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

  getAllProject() {
    return this.http.get<any[]>(this.baseEndPoint + '/projects', this.httpOptions);
  }

  getProject(id: number) {
    return this.http.get<any>(this.baseEndPoint + '/project/' + id, this.httpOptions);
  }

  addProject(project: any) {
    return this.http.post<any>(this.baseEndPoint + '/project/add', JSON.stringify(project), this.httpOptions);
  }
}
