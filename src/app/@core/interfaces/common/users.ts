import { Observable } from 'rxjs';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}



export abstract class UserData {
  abstract getCurrent(id): Observable<any>;
  abstract get(id: number): Observable<User>;
  abstract updateCurrent(id: any, user: any): Observable<any>;
  // abstract updateCurrent(updatedUser: User): Observable<User>;
  abstract create(user: User): Observable<User>;
  abstract delete(id): Observable<boolean>;
}
