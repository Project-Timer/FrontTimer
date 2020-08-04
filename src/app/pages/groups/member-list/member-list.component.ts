import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  @Input() members: any[];
  @Input() show: boolean;

  constructor() {
  }

  ngOnInit() {
    this.show = false;
  }

  public changeVisibility() {
    this.show = !this.show;
  }
}
