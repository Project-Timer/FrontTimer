import { Observable } from 'rxjs';

export interface User {
  lastName: string;
  firstName: string;
  email: string;
}



export abstract class UserData {
  abstract getCurrent(id): Observable<any>;
  abstract get(id: number): Observable<User>;
  abstract updateCurrent(user: any): Observable<any>;
  abstract create(user: User): Observable<User>;
  abstract delete(id): Observable<boolean>;
}
