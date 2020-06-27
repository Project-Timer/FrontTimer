import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ConsignApi {
  private readonly apiController: string = 'vtom/consignation';

  constructor(private api: HttpService) { }


  getByRefProject(refProject: any): Observable<any[]> {
    return this.api.get(`${this.apiController}/getByProject?refproject=${refProject}`)
      .pipe(map(data => {
        return data;
      }));
  }

}
