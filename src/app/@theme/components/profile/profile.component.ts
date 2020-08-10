import { Component } from '@angular/core';
import { NbTokenService, NbAuthJWTToken } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
})
export class NgxProfileComponent {
  constructor(
    private tokenService: NbTokenService,
  ) { }
  user: {
    id: string,
    name: string,
    role: string,
    group: string,
  };
  alive: boolean = true;

  ngOnInit() {
    this.tokenService.get()
      .pipe(takeWhile(() => this.alive))
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {}
      });
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
