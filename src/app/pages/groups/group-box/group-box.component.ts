import {Component, Input, OnInit, Output} from '@angular/core';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';
import {GroupService} from '../group.service';

@Component({
  selector: 'ngx-group-box',
  templateUrl: './group-box.component.html',
  styleUrls: ['./group-box.component.scss'],
})
export class GroupBoxComponent implements OnInit {
  private user;

  @Input() group: any;
  @Output() show: boolean;

  constructor(private tokenService: NbTokenService, private groupService: GroupService) {
  }

  ngOnInit() {
    this.tokenService.get()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {};
      });
  }

  getAdmin(group) {
    return this.groupService.getAdmin(group);
  }

  public showMembers() {
    this.show = !this.show;
  }
}
