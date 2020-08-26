import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  @Input() groups: any[];
  @Input() show: boolean;

  constructor() {
  }

  ngOnInit() {
    this.show = false;
  }
}
