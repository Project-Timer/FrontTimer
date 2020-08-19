import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GroupService} from '../group.service';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';

@Component({
  selector: 'ngx-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit {
  private group = {
    name: '',
    user: [],
  };
  private members;
  @Output() someEvent = new EventEmitter<string>();

  constructor(private groupService: GroupService, private tokenService: NbTokenService) { }

  ngOnInit() {
    this.getMembers();
  }

  save() {
    this.groupService.addGroup(this.group).subscribe(
      res => {
        this.group.name = '';
        this.group.user = [];
        this.someEvent.next('groups');
      },
      error => {
        /* TODO: ERRORS */
      },
    );
  }

  getMembers() {
    this.groupService.getAllMembers().subscribe(data => {
      this.members = data;
    });
  }
}
