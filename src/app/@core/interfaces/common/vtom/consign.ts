import { Observable } from 'rxjs';

export interface Consign {
  refProject: string;
  date: string;
  action: string;
  envname: string;
  appname: string;
  jobname: string;
}

export abstract class ConsignData {
  abstract getByRefProject(refProject: any): Observable<any[]>;
}
