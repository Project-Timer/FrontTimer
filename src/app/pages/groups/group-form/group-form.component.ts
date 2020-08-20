import {Component, EventEmitter, OnInit, Output, ChangeDetectorRef} from '@angular/core';
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
  private user;
  private errors = null;
  @Output() someEvent = new EventEmitter<string>();

  constructor(private groupService: GroupService, private tokenService: NbTokenService,
              private cr: ChangeDetectorRef) { }

  ngOnInit() {
    this.tokenService.get()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {};
      });
    this.getMembers();
  }

  save() {
    this.groupService.addGroup(this.group).subscribe(
      res => {
        this.group.name = '';
        this.group.user = [];
        this.someEvent.next('groups');
        this.errors = null;
      },
      error => {
        this.errors = error.error.message;
        this.cr.detectChanges();
      },
    );
  }

  getMembers() {
    this.groupService.getAllMembers().subscribe(data => {
      this.members = data;
      this.members = this.members.filter(obj => {
        return obj._id !== this.user._id;
      });
    });
  }
}
