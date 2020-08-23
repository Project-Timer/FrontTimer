import { Component } from '@angular/core';
import { NbTokenService, NbAuthJWTToken } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { UserData, User } from '../../../@core/interfaces/common/users';
import { UsersService } from '../../../@core/backend/common/services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
})

export class NgxProfileComponent {
  // updatedUser: User
  user: any
  showFields: boolean

  constructor(
    private tokenService: NbTokenService,
    private userService: UsersService,
    protected router: Router,
  ) { }


  alive: boolean = true;

  ngOnInit() {
    this.showFields = false
    this.tokenService.get()
      .pipe(takeWhile(() => this.alive))
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {}
        // console.log(token.getPayload()._id)
        this.userService.getCurrent(token.getPayload()._id).subscribe(data => {
          console.log(data)
          return this.user = data
        }
        )
      });


  }

  switchModeEdit() {
    this.showFields ? this.showFields = false : this.showFields = true

  }
  submitUpdate() {

    console.log(this.user._id)
    this.userService.updateCurrent(this.user._id, this.user).subscribe(ack => {
      console.log(ack)
    }
    )

  }
  submitDelete() {

    if (window.confirm(`Would You Like to confirm the deletion of ${this.user.name}'s account? Please note that this action is irreversible`)) {

      this.userService.delete(this.user._id).subscribe(data => {
        this.tokenService.clear()
        this.router.navigate(['/auth/login'])
      })
    }
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
