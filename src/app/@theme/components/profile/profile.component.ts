import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbTokenService, NbAuthJWTToken} from '@nebular/auth';
import {takeWhile} from 'rxjs/operators';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {GroupService} from '../../../pages/groups/group.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
})

export class NgxProfileComponent implements OnInit, OnDestroy {
  // updatedUser: User
  user: any;
  showFields: boolean;
  token;
  groups;

  constructor(
    private tokenService: NbTokenService,
    private userService: UsersService,
    protected router: Router,
    private toaster: NbToastrService,
    private groupService: GroupService,
  ) {
  }

  alive: boolean = true;

  ngOnInit() {
    this.showFields = false;
    this.tokenService.get()
      .pipe(takeWhile(() => this.alive))
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {};
        this.token = token.isValid() ? token.getValue() : {};
        // console.log(token.getPayload()._id)
        this.userService.getCurrent(token.getPayload()._id).subscribe(data => {
            // console.log(data)
            return this.user = data;
          },
        );
      });

    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data.filter(obj => {
        return obj.admin._id === this.user._id;
      });
    });
  }

  switchModeEdit() {
    this.showFields ? this.showFields = false : this.showFields = true;

  }

  submitUpdate() {

    const userUpdate = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
    };

    this.userService.updateCurrent(userUpdate).subscribe(
      data => {
        // console.log(ack)
        this.toaster.success('User successfully updated', 'Success', {'duration': 5000});
        this.router.navigate(['/pages/dashboard']);
      },
      error => {
        this.toaster.danger(error.error.message, 'Oops...', {'duration': 5000});
      });
  }

  submitDelete() {

    if (this.groups.length > 0) {
      this.toaster.danger('You are admin of ' + this.groups.length + ' group(s), please transfer the rights before deleting your account', 'danger', {'duration': 5000});
    } else {
      if (window.confirm(`Would You Like to confirm the deletion of ${this.user.firstName}'s account? Make sure you are not an admin of group, Please note that this action is irreversible `)) {
        this.userService.delete(this.token).subscribe(data => {
            this.toaster.success('User successfully deleted', 'Success', {'duration': 5000});
            this.router.navigate(['/auth/login']);
          },
          error => {
            this.toaster.danger(error.error.message, 'You can not delete your account', {'duration': 5000});
          });
      }
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
