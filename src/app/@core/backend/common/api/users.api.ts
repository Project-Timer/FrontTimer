import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersApi {
  private readonly apiController: string = 'user';

  constructor(private api: HttpService) {}

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
        const picture = `${this.api.apiUrl}/${this.apiController}/${data.id}/photo`;
        return { ...data, picture };
      }));
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(`${this.apiController}/${id}`);
  }

  add(item: any): Observable<any> {
    return this.api.post(this.apiController, item);
  }

  updateCurrent(item: any): Observable<any> {
    return this.api.put(`${this.apiController}/current`, item);
  }

  update(user: any): Observable<any> {
    return this.api.put(`${this.apiController}/${user.id}`, user);
  }
}
