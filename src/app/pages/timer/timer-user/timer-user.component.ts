import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TimerService} from '../../../@core/backend/common/services/timer.service';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';

@Component({
  selector: 'ngx-timer-user',
  templateUrl: './timer-user.component.html',
  styleUrls: ['./timer-user.component.scss'],
})
export class TimerUserComponent implements OnInit {
  timers;
  user;

  constructor(private route: ActivatedRoute, private tokenService: NbTokenService, private timerService: TimerService,
              private cr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.tokenService.get()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {};
      });
    this.timers = this.route.snapshot.data.timers;
    this.timers = this.timers.filter(obj => {
      return obj.dateEnd !== undefined;
    });
    this.timers.sort((a, b) => (a.dateStart < b.dateStart) ? 1 : -1);
  }

  getTimers() {
    return this.timerService.getTimersByUser(this.user._id).subscribe(
      data => {
        this.timers = data.filter(obj => {
          return obj.dateEnd !== undefined;
        });
        this.timers.sort((a, b) => (a.dateStart < b.dateStart) ? 1 : -1);
        this.cr.detectChanges();
      },
    );
  }
}
