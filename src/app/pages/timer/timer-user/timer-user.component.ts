import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TimerService} from '../../../@core/backend/common/services/timer.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-timer-user',
  templateUrl: './timer-user.component.html',
  styleUrls: ['./timer-user.component.scss'],
})
export class TimerUserComponent implements OnInit {
  timers;

  constructor(private route: ActivatedRoute, private timerService: TimerService, private toaster: NbToastrService,
              private cr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.timers = this.route.snapshot.data.timers;
  }

  getDiff(dateOne, dateTwo) {
    dateOne = new Date(dateOne).getTime();
    dateTwo = new Date(dateTwo).getTime();
    let diff = Math.round((dateTwo - dateOne) / 1000);
    const d = Math.floor(diff / (24 * 60 * 60));
    diff = diff - (d * 24 * 60 * 60);
    const h = Math.floor(diff / (60 * 60));
    diff = diff - (h * 60 * 60);
    const m = Math.floor(diff / (60));
    diff = diff - (m * 60);
    const s = diff;
    return d + ' day(s), ' + h + ' hour(s), ' + m + ' minute(s), ' + s + ' second(s)';
  }

  delete(timer) {
    const id = timer._id;
    this.timerService.delete(id).subscribe(
      res => {
        this.timers = this.timers.filter(obj => {
          return obj._id !== id;
        });
        this.cr.detectChanges();
        this.toaster.success('Timer successfully deleted', 'Success', {'duration': 5000});
      },
      error => {
        this.toaster.danger(error.error.message, 'Oops...', {'duration': 5000});
      },
    );
  }
}
