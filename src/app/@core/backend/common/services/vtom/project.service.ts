import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectApi } from '../../api/vtom/project.api';
import { ProjectData, Project } from '../../../../interfaces/common/vtom/project';

@Injectable()
export class ProjectService extends ProjectData {

  constructor(private api: ProjectApi) {
    super();
  }

  getAll(): Observable<Project[]> {
    return this.api.getAll();
  }

  createOne(project: any): Observable<Project> {
    return this.api.add(project);
  }

  update(refProject: any, newStatus: any): Observable<any> {
    return this.api.update(refProject, newStatus);
  }
}
