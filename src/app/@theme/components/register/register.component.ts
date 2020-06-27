import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { NbRegisterComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';


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
  ngOnInit(){
  }
  inscription(lastname, name, email, password) {
    this.service.register('email', {lastname: lastname, name: name, email: email, password: password }).subscribe(res => {
      this.toasterService.success(`l'utilisateur ${name + " " + lastname} a été enregistré avec succes.`, `Opération Réussie`, { duration: 3500 });
    }
    ), err => {
      this.toasterService.danger(`Http Code: ${err.status}`, `Erreur dans l'enregistrement de l'utilisateur`, { duration: 4500 });
    }
    this.router.navigate(['auth/login']);
  }
}
