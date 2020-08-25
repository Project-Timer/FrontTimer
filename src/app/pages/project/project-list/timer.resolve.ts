import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {TimerService} from '../../../@core/backend/common/services/timer.service';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';
import {catchError, map} from 'rxjs/operators';
import {NbToastrService} from '@nebular/theme';

@Injectable()
export class TimerResolve implements Resolve<any> {
  private user;

  constructor(private timerService: TimerService, private tokenService: NbTokenService,
              private toaster: NbToastrService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.tokenService.get()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {};
      });
    return this.timerService.getTimersByUser(this.user._id).pipe(
      map(res => res),
      catchError(() => {
        this.toaster.danger('A server error has occured. Please try later!', 'Oops...', {'duration': 5000});
        this.router.navigate(['/']);
        return EMPTY;
      }),
    );
  }

}
