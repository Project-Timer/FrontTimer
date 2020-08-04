import {Component, OnInit} from '@angular/core';
import {GroupService} from '../group.service';

@Component({
  selector: 'ngx-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})

export class GroupListComponent implements OnInit {
  private groups;

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
    this.getAllGroups();
  }

  getAllGroups() {
    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
    });
  }
}
