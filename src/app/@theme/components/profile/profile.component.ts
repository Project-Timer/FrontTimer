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
  
  constructor(
    private tokenService: NbTokenService,
    private userService: UsersService,
    protected router: Router,
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
          return this.user = data
        }
          )
      });


  }
  submitUpdate() {
    this.tokenService.get()
      .pipe(takeWhile(() => this.alive))
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {}
        // console.log(token.getPayload()._id)
        this.userService.updateCurrent(token.getPayload()._id).subscribe(data=>{
          console.log(data)
          return this.user = data
        }
          )
      });

  }
  submitDelete() {
    this.tokenService.get()
      .pipe(takeWhile(() => this.alive))
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {}
        // console.log(token.getPayload()._id)
        this.userService.delete(token.getPayload()._id).subscribe(data=>{
          console.log(data)
            this.router.navigate(['/auth/login'])
        }
          )
      });
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
