import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectService} from '../project.service';

@Injectable()
export class ProjectsResolve implements Resolve<any> {
  constructor(private projectService: ProjectService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.projectService.getAllProject();
  }

}
