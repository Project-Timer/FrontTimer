import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VersionsApi } from '../api/version.api';
import { VersionData, Version } from '../../../interfaces/common/version';

@Injectable()
export class VersionService extends VersionData {

  constructor(private api: VersionsApi) {
    super();
  }

  getAll(): Observable<Version[]> {
    return this.api.getAll();
  }

  addOne(version: Version): Observable<any> {
    return this.api.add(version);
  }

  update(user: any): Observable<Version> {
    return this.api.update(user);
  }

  updateCurrent(user: any): Observable<Version> {
    return this.api.updateCurrent(user);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(id);
  }
}
