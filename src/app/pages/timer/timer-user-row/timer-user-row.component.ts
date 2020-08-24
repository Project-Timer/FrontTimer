import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TimerService} from '../../../@core/backend/common/services/timer.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: '[ngx-timer-user-row]',
  templateUrl: './timer-user-row.component.html',
  styleUrls: ['./timer-user-row.component.scss'],
})
export class TimerUserRowComponent implements OnInit {
  @Input() timer;
  @Output() someEvent = new EventEmitter<string>();
  edit = false;

  constructor(private timerService: TimerService, private toaster: NbToastrService) {
  }

  ngOnInit() {
  }

  getDiff() {
    let diff = Math.round((new Date(this.timer.dateEnd).getTime() - new Date(this.timer.dateStart).getTime()) / 1000);
    const d = Math.floor(diff / (24 * 60 * 60));
    diff = diff - (d * 24 * 60 * 60);
    const h = Math.floor(diff / (60 * 60));
    diff = diff - (h * 60 * 60);
    const m = Math.floor(diff / (60));
    diff = diff - (m * 60);
    const s = diff;
    return d + ' day(s), ' + h + ' hour(s), ' + m + ' minute(s), ' + s + ' second(s)';
  }

  delete() {
    this.timerService.delete(this.timer._id).subscribe(
      res => {
        this.someEvent.emit('timer');
        this.toaster.success('Timer successfully deleted', 'Success', {'duration': 5000});
      },
      error => {
        this.toaster.danger(error.error.message, 'Oops...', {'duration': 5000});
      },
    );
  }

  editDescription() {
    if (this.edit) {
      this.timerService.update(this.timer).subscribe(
        data => {
          this.toaster.success('Timer successfully updated', 'Success', {'duration': 5000});
        },
        error => {
          this.toaster.danger(error.error.message, 'Oops...', {'duration': 5000});
        },
      );
    }
    this.edit = !this.edit;
  }
}
