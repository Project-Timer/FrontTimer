import {Component, Input, OnInit, Output} from '@angular/core';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';

@Component({
  selector: 'ngx-group-box',
  templateUrl: './group-box.component.html',
  styleUrls: ['./group-box.component.scss'],
})
export class GroupBoxComponent implements OnInit {
  private user;

  @Input() group: any;
  @Output() show: boolean;

  constructor(private tokenService: NbTokenService) {
  }

  ngOnInit() {
    this.tokenService.get()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {};
      });
  }

  getAdmin(group) {
    for (const member of group.user) {
      if (member.role === 'admin') {
        return member.user_id;
      }
    }
  }

  public showMembers() {
    this.show = !this.show;
  }
}
