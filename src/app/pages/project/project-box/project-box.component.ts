import {Component, Input, OnInit, Output} from '@angular/core';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';

@Component({
  selector: 'ngx-project-box',
  templateUrl: './project-box.component.html',
  styleUrls: ['./project-box.component.scss'],
})
export class ProjectBoxComponent implements OnInit {
  private user;

  @Input() project: any;
  @Output() show: boolean;

  constructor(private tokenService: NbTokenService) { }

  ngOnInit() {
    this.tokenService.get()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {};
      });
  }

  public showGroups() {
    this.show = !this.show;
  }
}
