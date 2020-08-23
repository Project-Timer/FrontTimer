import { Component } from '@angular/core';
import { NbLoginComponent, NbTokenService, NbAuthJWTToken } from '@nebular/auth';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {
  // login() {
  //   this.router.navigate(['/']);
  // }
  showPassword = true;

  // getInputType() {
  //   if (this.showPassword) {
  //     return 'text';
  //   }
  //   return 'password';
  // }

  // toggleShowPassword() {
  //   this.showPassword = !this.showPassword;
  // }
}
