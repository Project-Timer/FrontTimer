import {Component, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss'],
})
export class GroupViewComponent implements OnInit {
  private group;
  private editMode = false;

  constructor(private groupService: GroupService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.getGroup();
  }

  getGroup() {
    this.groupService.getGroup(this.route.snapshot.params.id).subscribe(data => {
      this.group = data;
    });
  }

  changeMode() {
    this.editMode = !this.editMode;
  }

  save() {
    this.groupService.updateGroup(this.group).subscribe(data => {
      this.group = data;
    });
  }

  delete() {
    this.groupService.deleteGroup(this.group).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['/pages/groups']);
      }
    });
  }

  deleteMember(member: any) {
    const index = this.group.user.indexOf(member);
    this.group.user.splice(index, 1);
    this.save();
  }
}
