import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ngx-timer-modal',
  templateUrl: './timer-modal.component.html',
  styleUrls: ['./timer-modal.component.scss'],
})
export class TimerModalComponent implements OnInit {
  @Input() show = false;
  @Output() someEvent = new EventEmitter<string>();
  text = '';

  constructor() {
  }

  ngOnInit() {
  }

  close() {
    this.show = !this.show;
    this.someEvent.emit('false');
  }

  save() {
    this.show = !this.show;
    this.someEvent.emit(this.text);
    this.text = '';
  }
}
