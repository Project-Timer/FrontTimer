import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from '../project.service';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';
import {GroupService} from '../../groups/group.service';

@Component({
  selector: 'ngx-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  private project = {
    name: '',
    group: [],
  };
  private user;
  private groups;
  @Output() someEvent = new EventEmitter<string>();

  constructor(private projectService: ProjectService, private tokenService: NbTokenService,
              private groupService: GroupService) {
  }

  ngOnInit() {
    this.tokenService.get()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {};
      });
    this.getGroups();
  }

  save() {
    this.projectService.addProject(this.project).subscribe(
      res => {
        this.project.name = '';
        this.project.group = [];
        this.someEvent.next('projects');
      },
      error => {
        /* TODO: ERRORS */
      },
    );
  }

  getGroups() {
    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
    });
  }
}
