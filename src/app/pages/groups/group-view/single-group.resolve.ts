import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {GroupService} from '../group.service';
import {catchError, map} from 'rxjs/operators';
import {NbToastrService} from '@nebular/theme';

@Injectable()
export class SingleGroupResolve implements Resolve<any> {
  constructor(private groupService: GroupService, private router: Router, private toaster: NbToastrService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.groupService.getGroup(route.params.id).pipe(
      map(res => res),
      catchError(() => {
        this.toaster.danger('A server error has occured. Please try later!', 'Oops...', {'duration': 5000});
        this.router.navigate(['/']);
        return EMPTY;
      }),
    );
  }

}
