import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
})
export class ProjectViewComponent implements OnInit {
  private project;
  private editMode = false;
  private show = false;
  private groups;
  private selectedValue = [];

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.projectService.getProject(this.route.snapshot.params.id).subscribe(data => {
      this.project = data;
    });
  }

  changeMode() {
    this.editMode = !this.editMode;
  }
}
