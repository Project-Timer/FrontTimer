import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ngx-group-box',
  templateUrl: './group-box.component.html',
  styleUrls: ['./group-box.component.scss'],
})
export class GroupBoxComponent implements OnInit {
  @Input() group: any;
  @Output() show: boolean;
  @Input() user: any;

  constructor() {
  }

  ngOnInit() {
  }

  public showMembers() {
    this.show = !this.show;
  }
}
