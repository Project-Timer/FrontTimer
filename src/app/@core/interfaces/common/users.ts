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
  abstract getCurrentUser(): Observable<User>;
  abstract get(id: number): Observable<User>;
  abstract update(user: any): Observable<any>;
  abstract updateCurrent(updatedUser: User): Observable<User>;
  abstract create(user: User): Observable<User>;
  abstract delete(id: number): Observable<boolean>;
}
