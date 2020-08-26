import {Component, ChangeDetectorRef, Inject} from '@angular/core';
import {NbRegisterComponent, NbAuthService, NB_AUTH_OPTIONS} from '@nebular/auth';
import {NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';


@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
})
export class NgxRegisterComponent extends NbRegisterComponent {

  constructor(
    protected service: NbAuthService,
    protected cd: ChangeDetectorRef,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router,
    private toasterService: NbToastrService,
  ) {
    super(service, options, cd, router);
  }

  inscription(firstName, lastName, email, password) {
    this.service.register('email', {firstName: firstName, lastName: lastName, email: email, password: password})
      .subscribe(
        res => {
          if (res.getResponse().error) {
            this.toasterService.danger(res.getResponse().error.message, 'Oops...', {duration: 4500});
          } else {
            this.toasterService.success(`User ${firstName + ' ' + lastName} has been successfully registered.`, `Successful operation`, {duration: 3500});
            this.router.navigate(['auth/login']);
          }
        },
        err => {
          this.toasterService.danger(err.error.message, {duration: 4500});
        });
  }
}
