import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {ProjectService} from '../project.service';
import {catchError, map} from 'rxjs/operators';
import {NbToastrService} from '@nebular/theme';

@Injectable()
export class ProjectsResolve implements Resolve<any> {
  constructor(private projectService: ProjectService, private router: Router, private toaster: NbToastrService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.projectService.getAllProject().pipe(
      map(res => res),
      catchError(() => {
        this.toaster.danger('A server error has occured. Please try later!', 'Oops...', {'duration': 5000});
        this.router.navigate(['/']);
        return EMPTY;
      }),
    );
  }

}
