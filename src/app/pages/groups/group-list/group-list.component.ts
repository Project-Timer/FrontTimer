import {Component, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})

export class GroupListComponent implements OnInit {
  private groups;
  private show = false;
  private group: {
    name: string,
    user: [],
  };

  constructor(private groupService: GroupService, private router: Router) {
  }

  ngOnInit() {
    this.getAllGroups();
    this.group = {
      name: '',
      user: [],
    };
  }

  getAllGroups() {
    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
    });
  }

  showFormGroup() {
    this.show = !this.show;
  }

  save() {
    this.groupService.addGroup(this.group).subscribe(res => {
      this.group.name = '';
      this.getAllGroups();
    });
  }
}
