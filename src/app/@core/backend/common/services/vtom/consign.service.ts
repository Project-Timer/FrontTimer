import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsignApi } from '../../api/vtom/consign.api';
import { Consign, ConsignData } from '../../../../interfaces/common/vtom/consign';

@Injectable()
export class ConsignService extends ConsignData {

  constructor(private api: ConsignApi) {
    super();
  }

  getByRefProject(refProject): Observable<Consign[]> {
    return this.api.getByRefProject(refProject);
  }

}
