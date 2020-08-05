import { Component } from '@angular/core';
import { NbTokenService, NbAuthJWTToken } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { UserData, User } from '../../../@core/interfaces/common/users';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
})

export class NgxProfileComponent {
  updatedUser: User
  user: any
  constructor(
    private tokenService: NbTokenService,
    private userService: UserData
  ) { }


  alive: boolean = true;

  ngOnInit() {
    this.tokenService.get()
      .pipe(takeWhile(() => this.alive))
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {}
        console.log(this.user)
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
