import { Observable } from 'rxjs';

export interface Project {
  CODE_PROJET_ITCE: number;
  CODE_CLARITY: string;
  LIBELLE: string;
  DEM_FONCT: string;
  CODE_GECOCH: string;
  CODE_SNOW: string;
  VERSION_MYSYS: string;
  DATE_RECEPTION: string;
  STATUS: number;

}

export abstract class ProjectData {
  abstract getAll(): Observable<Project[]>;
  abstract update(refProject: any, newStatus: any): Observable<any>;
  abstract createOne(project: Project): any;
}
