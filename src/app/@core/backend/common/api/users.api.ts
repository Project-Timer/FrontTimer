import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersApi {
  private readonly apiController: string = 'user';

  constructor(private api: HttpService) { }

  getCurrent(id): Observable<any> {
    // console.log(id)
    return this.api.get(`${this.apiController}/${id}`)
      .pipe(map(data => {
        return data
      }));
  }

  get(id: number): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`)
      .pipe(map(data => {
        return { ...data };
      }));
  }
  updateCurrent(user: any): Observable<any> {
    return this.api.put(`${this.apiController}`, user)
      .pipe(map(data => {
        return data ;
      }));
  }


  delete(id): Observable<any> {
    // console.log(id)
    return this.api.delete(`${this.apiController}`)
      .pipe(map(data => {
        return data
      }));
  }
  add(item: any): Observable<any> {
    return this.api.post(this.apiController, item);
  }

  // updateCurrent(item: any): Observable<any> {
  //   return this.api.put(`${this.apiController}`, item);
  // }


}
