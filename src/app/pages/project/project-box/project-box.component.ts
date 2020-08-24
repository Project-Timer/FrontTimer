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
  showBtnTimer = false;
  tooltipMessage = 'Please wait...';
  interval = null;
  globalTime = null;
  showModal = false;
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
    if (this.project.admin._id === this.user._id) {
      this.showBtnTimer = true;
    } else {
      for (const projectGroup of this.project.groups) {
        this.groupService.getGroup(projectGroup._id).subscribe(data => {
          this.showBtnTimer = data.users.some(u => u._id === this.user._id) || data.admin._id === this.user._id;
          this.cr.detectChanges();
        });
      }
    }
  }

  public changeTimerStatus() {
    if (this.timer) {
      this.showModal = true;
    } else {
      this.timerService.startTimer(this.project._id).subscribe(
        data => {
          this.toaster.success(data.message, 'Success', {'duration': 5000});
          if (data.active) {
            this.timer = data.data;
            this.startTimer();
            this.someEvent.emit(this.timer);
          } else {
            this.timer = null;
            this.tooltipMessage = 'Please wait...';
            this.interval = null;
            this.someEvent.emit(this.timer);
          }
        },
        error => {
          this.toaster.danger(error.error.message, 'Oops...', {'duration': 5000});
        },
      );
    }
  }

  public startTimer() {
    const date = new Date(this.timer.dateStart);
    const startStamp = date.getTime();

    this.interval = interval(500).subscribe(() => {
      const newDate = new Date();
      const newStamp = newDate.getTime();

      const diff = Math.round((newStamp - startStamp) / 1000);
      this.tooltipMessage = this.getMessage(diff) + ' working';

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
    this.timerService.getTimersByProject(this.project._id).subscribe(
      data => {
        let time = 0;
        for (const counter of data) {
          const dateOne = new Date(counter.dateStart).getTime();
          const dateTwo = new Date(counter.dateEnd).getTime();
          if (dateOne && dateTwo) {
            const diff = Math.round((dateTwo - dateOne) / 1000);
            time += diff;
          }
        }
        this.globalTime = this.getMessage(time);
        this.cr.detectChanges();
      },
    );
  }

  getMessage(time) {
    const d = Math.floor(time / (24 * 60 * 60));
    time = time - (d * 24 * 60 * 60);
    const h = Math.floor(time / (60 * 60));
    time = time - (h * 60 * 60);
    const m = Math.floor(time / (60));
    time = time - (m * 60);
    const s = time;
    return d + ' day(s), ' + h + ' hour(s), ' + m + ' minute(s), ' + s + ' second(s)';
  }

  changeShowModal(text) {
    this.showModal = false;
    if (text !== 'false') {
      this.timerService.startTimer(this.project._id, text).subscribe(
        data => {
          this.toaster.success(data.message, 'Success', {'duration': 5000});
          this.timer = null;
          this.tooltipMessage = 'Please wait...';
          this.interval = null;
          this.someEvent.emit(this.timer);
        },
        error => {
          this.toaster.danger(error.error.message, 'Oops...', {'duration': 5000});
        },
      );
    }
  }
}
