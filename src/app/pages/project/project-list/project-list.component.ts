import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../project.service';

@Component({
  selector: 'ngx-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  private projects;
  private show = false;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.getAllProject();
  }

  getAllProject() {
    this.projectService.getAllProject().subscribe(data => {
      this.projects = data;
    });
  }

  showFormProject() {
    this.show = !this.show;
  }
}
