import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private baseEndPoint = 'https://workandout.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  getAllGroups() {
    return this.http.get<any[]>(this.baseEndPoint + '/groups');
  }

  getGroup(id: number) {
    return this.http.get(this.baseEndPoint + '/group/' + id);
  }
}
