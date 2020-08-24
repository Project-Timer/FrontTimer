import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss'],
})
export class GroupViewComponent implements OnInit {
  group;
  editMode = false;
  show = false;
  members;
  selectedValue = [];
  user;
  editAdmin = false;
  adminList;
  selectAdmin = null;

  constructor(private groupService: GroupService, private route: ActivatedRoute, private router: Router,
              private toaster: NbToastrService, private tokenService: NbTokenService, private cr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.group = this.route.snapshot.data.group;
    this.tokenService.get()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {};
      });
    this.getAllMembers();
    this.getAdminList();
  }

  changeMode() {
    if (this.group.admin._id === this.user._id) {
      this.editMode = !this.editMode;
    }
  }

  save() {
    const newGroup = {...this.group};
    newGroup.users = [];
    for (const groupUser of this.group.users) {
      newGroup.users.push(groupUser._id);
    }
    this.groupService.updateGroup(newGroup).subscribe(
      data => {
        this.toaster.success('Group successfully updated', 'Success', {'duration': 5000});
        this.group = data;
        this.cr.detectChanges();
      },
      error => {
        this.toaster.danger(error.error.message, 'Oops...', {'duration': 5000});
      },
    );
  }

  delete() {
    this.groupService.deleteGroup(this.group).subscribe(
      res => {
        this.toaster.success('Group successfully deleted', 'Success', {'duration': 5000});
        this.router.navigate(['/pages/groups']);
      },
      error => {
        this.toaster.danger(error.error.message, 'Oops...', {'duration': 5000});
      },
    );
  }

  deleteMember(member: any) {
    this.group.users = this.group.users.filter(obj => {
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
      this.members = this.members.filter(obj => {
        return obj._id !== this.user._id;
      });
      for (const member of this.group.users) {
        this.members = this.members.filter(obj => {
          return obj._id !== member._id;
        });
      }
    });
  }

  getAdminList() {
    this.groupService.getAllMembers().subscribe(data => {
      this.adminList = data;
      this.adminList = this.adminList.filter(obj => {
        return obj._id !== this.user._id;
      });
    });
  }

  addUser() {
    for (const value of this.selectedValue) {
      const user = this.members.find(obj => {
        return obj._id === value;
      });
      user.role = 'user';
      this.group.users.push(user);
      this.members = this.members.filter(obj => {
        return obj._id !== value;
      });
    }
    this.selectedValue = [];
    this.save();
  }

  saveAdmin() {
    this.group.admin = this.selectAdmin;
    this.editAdmin = false;
    this.save();
    this.selectAdmin = null;
  }
}
