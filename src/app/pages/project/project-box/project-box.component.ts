import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {NbTokenService} from '@nebular/auth';
import {GroupService} from '../../groups/group.service';
import {TimerService} from '../../../@core/backend/common/services/timer.service';
import {NbToastrService} from '@nebular/theme';
import {interval} from 'rxjs';

@Component({
  selector: 'ngx-project-box',
  templateUrl: './project-box.component.html',
  styleUrls: ['./project-box.component.scss'],
})
export class ProjectBoxComponent implements OnInit, OnChanges {
  private showBtnTimer = false;
  private tooltipMessage = null;
  private interval = null;
  @Input() user;
  @Input() timer = null;
  @Input() project: any;
  @Output() show: boolean;
  @Output() someEvent = new EventEmitter<string>();

  constructor(private tokenService: NbTokenService, private groupService: GroupService, private cr: ChangeDetectorRef,
              private timerService: TimerService, private toaster: NbToastrService) {
  }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.timer = changes.timer.currentValue;
    this.init();
  }

  public showGroups() {
    this.show = !this.show;
  }

  public checkMemberIn() {
    for (const projectGroup of this.project.groups) {
      this.groupService.getGroup(projectGroup._id).subscribe(data => {
        this.showBtnTimer = data.users.some(u => u._id === this.user._id) || data.admin._id === this.user._id;
        this.cr.detectChanges();
      });
    }
  }

  public changeTimerStatus() {
    this.timerService.startTimer(this.project._id).subscribe(
      data => {
        this.toaster.success(data.message, 'Success', {'duration': 5000});
        if (data.active) {
          this.timer = data.data;
          this.startTimer();
          this.someEvent.emit(this.timer);
        } else {
          this.timer = null;
          this.tooltipMessage = null;
          this.interval = null;
          this.someEvent.emit(this.timer);
        }
      },
      error => {
        this.toaster.danger(error.error.message, 'Oops...', {'duration': 5000});
      },
    );
  }

  public startTimer() {
    const date = new Date(this.timer.dateStart);
    const startStamp = date.getTime();

    this.interval = interval(500).subscribe(() => {
      const newDate = new Date();
      const newStamp = newDate.getTime();

      let diff = Math.round((newStamp - startStamp) / 1000);

      const d = Math.floor(diff / (24 * 60 * 60));
      diff = diff - (d * 24 * 60 * 60);
      const h = Math.floor(diff / (60 * 60));
      diff = diff - (h * 60 * 60);
      const m = Math.floor(diff / (60));
      diff = diff - (m * 60);
      const s = diff;
      this.tooltipMessage = d + ' day(s), ' + h + ' hour(s), ' + m + ' minute(s), ' + s + ' second(s) working';

      if (!this.cr['destroyed']) {
        this.cr.detectChanges();
      }
      if (this.timer === null) {
        this.interval.unsubscribe();
      }
    });
  }

  init() {
    if (this.timer !== null && this.timer.project._id === this.project._id) {
      this.showBtnTimer = true;
      this.startTimer();
    } else if (this.timer !== null && this.timer.project._id !== this.project._id) {
      this.showBtnTimer = false;
    } else {
      this.checkMemberIn();
    }
  }
}
