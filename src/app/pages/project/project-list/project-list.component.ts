import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProjectService} from '../project.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  private projects;
  private show = false;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private cr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.projects = this.route.snapshot.data.projects;
  }

  getAllProject() {
    this.projectService.getAllProject().subscribe(data => {
      this.projects = data;
      this.cr.detectChanges();
    });
  }

  showFormProject() {
    this.show = !this.show;
  }
}
