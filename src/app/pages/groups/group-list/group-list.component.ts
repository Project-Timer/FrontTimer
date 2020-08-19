import {Component, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})

export class GroupListComponent implements OnInit {
  private groups;
  private show = false;

  constructor(private groupService: GroupService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.groups = this.route.snapshot.data.groups;
  }

  getAllGroups() {
    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
    });
  }

  showFormGroup() {
    this.show = !this.show;
  }
}
