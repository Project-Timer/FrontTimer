import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';

@Component({
  selector: 'ngx-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})

export class GroupListComponent implements OnInit {
  private groups;
  private show = false;
  private user;

  constructor(private groupService: GroupService, private router: Router, private route: ActivatedRoute,
              private cr: ChangeDetectorRef, private tokenService: NbTokenService) {
  }

  ngOnInit() {
    this.groups = this.route.snapshot.data.groups;
    this.tokenService.get()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {};
      });
  }

  getAllGroups() {
    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
      this.cr.detectChanges();
    });
  }

  showFormGroup() {
    this.show = !this.show;
  }
}
