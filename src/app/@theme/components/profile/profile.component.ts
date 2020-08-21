import { Component } from '@angular/core';
import { NbTokenService, NbAuthJWTToken } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { UserData, User } from '../../../@core/interfaces/common/users';
import { UsersService } from '../../../@core/backend/common/services/users.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
})

export class NgxProfileComponent {
  updatedUser: User
  user: any
  constructor(
    private tokenService: NbTokenService,
    private userService: UsersService
  ) { }


  alive: boolean = true;

  ngOnInit() {
    this.tokenService.get()
      .pipe(takeWhile(() => this.alive))
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {}
        // console.log(token.getPayload()._id)
        this.userService.getCurrent(token.getPayload()._id).subscribe(data=>{
          console.log(data)
        }
          )
      });


  }
  submitUpdate() {
    this.userService.update(this.updatedUser).subscribe(data => {
      if (data) { console.log(data) }
    })
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
