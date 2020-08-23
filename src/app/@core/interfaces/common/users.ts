import { Observable } from 'rxjs';

export interface User {
  name: string;
  lastName: string;
  email: string;
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
}

export abstract class UserData {
  abstract getCurrent(id): Observable<any>;
  abstract get(id: number): Observable<User>;
  abstract updateCurrent(user: any): Observable<any>;
  // abstract updateCurrent(updatedUser: User): Observable<User>;
  abstract create(user: User): Observable<User>;
  abstract delete(id: number): Observable<boolean>;
}
