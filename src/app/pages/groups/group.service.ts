import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
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

  getAllMembers() {
    return this.http.get<any[]>(this.baseEndPoint + '/users', this.httpOptions);
  }

  getAllGroups(): Observable<any> {
    return this.http.get<any[]>(this.baseEndPoint + '/groups', this.httpOptions);
  }

  getGroup(id: number): Observable<any> {
    return this.http.get<any>(this.baseEndPoint + '/group/' + id, this.httpOptions);
  }

  addGroup(group: any) {
    return this.http.post<any>(this.baseEndPoint + '/group', JSON.stringify(group), this.httpOptions);
  }

  updateGroup(group: any) {
    return this.http.put<any>(this.baseEndPoint + '/group/' + group._id, JSON.stringify(group), this.httpOptions);
  }

  deleteGroup(group: any) {
    return this.http.delete(this.baseEndPoint + '/group/' + group._id, {observe: 'response'});
  }

  getAdmin(group) {
    for (const member of group.users) {
      if (member.role === 'admin') {
        return member.user_id;
      }
    }
  }
}
