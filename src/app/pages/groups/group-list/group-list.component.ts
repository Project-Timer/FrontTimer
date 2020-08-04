import {Component, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';

@Component({
  selector: 'ngx-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})

export class GroupListComponent implements OnInit {
  private groups;
  private user;

  constructor(private groupService: GroupService, private tokenService: NbTokenService) {
  }

  ngOnInit() {
    this.tokenService.get()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {};
      });
    this.getAllGroups();
  }

  getAllGroups() {
    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
    });
  }

  getAdmin(group) {
    for (const member of group.user) {
      if (member.role === 'admin') {
        return member.user_id;
      }
    }
  }
}
