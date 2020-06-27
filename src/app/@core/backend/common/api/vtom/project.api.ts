import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ProjectApi {
  private readonly apiController: string = 'vtom/project';

  constructor(private api: HttpService) { }


  getAll(): Observable<any[]> {
    return this.api.get(`${this.apiController}`)
      .pipe(map(data => {
        return data;
      }));
  }

  add(item: any): Observable<any> {
    return this.api.post(this.apiController, item);
  }

  update(refProject: any, newStatus: any): Observable<any> {
    return this.api.put(`${this.apiController}?refproject=${refProject}&newStatus=${newStatus}`, {});
  }
}
