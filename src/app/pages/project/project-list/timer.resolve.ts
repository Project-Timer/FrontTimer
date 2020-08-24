import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TimerService} from '../../../@core/backend/common/services/timer.service';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';
import {map} from 'rxjs/operators';

@Injectable()
export class TimerResolve implements Resolve<any> {
  private user;

  constructor(private timerService: TimerService, private tokenService: NbTokenService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.tokenService.get()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {};
      });
    return this.timerService.getTimersByUser(this.user._id).pipe(
      map(res => res),
    );
  }

}
