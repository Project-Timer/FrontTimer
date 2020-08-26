import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectService} from '../project.service';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';
import {GroupService} from '../../groups/group.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  project = {
    name: '',
    groups: [],
  };
  @Input() user;
  groups;
  @Output() someEvent = new EventEmitter<string>();

  constructor(private projectService: ProjectService, private tokenService: NbTokenService,
              private groupService: GroupService, private toaster: NbToastrService) {
  }

  ngOnInit() {
    this.getGroups();
  }

  save() {
    this.projectService.addProject(this.project).subscribe(
      res => {
        this.project.name = '';
        this.project.groups = [];
        this.someEvent.next('projects');
      },
      error => {
        this.toaster.danger(error.error.message, 'Oops...', {'duration': 5000});
      },
    );
  }

  getGroups() {
    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
    });
  }
}
