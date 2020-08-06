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
  private show = false;
  private members;
  private selectedValue = [];

  constructor(private groupService: GroupService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.getGroup();
    this.getAllMembers();
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
    this.group.user = this.group.user.filter(obj => {
      return member._id !== obj._id;
    });
    this.members.push(member);
    this.save();
  }

  showFormMembers() {
    this.show = !this.show;
  }

  getAllMembers() {
    this.groupService.getAllMembers().subscribe(data => {
      this.members = data;
      for (const member of this.group.user) {
        this.members = this.members.filter(obj => {
          return obj._id !== member.user_id;
        });
      }
    });
  }

  addUser() {
    for (const value of this.selectedValue) {
      const user = this.members.find(obj => {
        return obj._id === value;
      });
      user.role = 'user';
      user.user_id = user._id;
      this.group.user.push(user);
      this.members = this.members.filter(obj => {
        return obj._id !== value;
      });
    }
    this.selectedValue = [];
    this.save();
  }
}
