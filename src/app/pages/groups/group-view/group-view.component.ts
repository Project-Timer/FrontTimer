import {Component, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss'],
})
export class GroupViewComponent implements OnInit {
  private group;

  constructor(private groupService: GroupService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getGroup();
  }

  getGroup() {
    this.groupService.getGroup(this.route.snapshot.params.id).subscribe(data => {
      this.group = data;
    });
  }
}
