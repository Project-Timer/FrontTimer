import { Observable } from 'rxjs';

export interface Version {
  CD_RELEASE: string;
  DT_1_INS_UTI: string;
  DT_1_INS_QPA: string;
  DT_BASC_PROD: string;
  CD_CM_SYNERGIE: string;
}

export abstract class VersionData {
  abstract getAll(): Observable<Version[]>;
  abstract update(version: Version): Observable<Version>;
  abstract addOne(version: Version): Observable<Version>;
  abstract delete(id: number): Observable<boolean>;
}
