import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersApi } from '../api/users.api';
import { UserData, User } from '../../../interfaces/common/users';

@Injectable()
export class UsersService extends UserData {

  constructor(private api: UsersApi) {
    super();
  }

  getCurrent(id): Observable<any> {
    return this.api.getCurrent(id);
  }

  get(id: number): Observable<User> {
    return this.api.get(id);
  }

  create(user: any): Observable<User> {
    return this.api.add(user);
  }

  updateCurrent(id: any, user: any): Observable<User> {
    return this.api.updateCurrent(id, user);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(id);
  }
}
