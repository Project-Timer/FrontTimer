import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../../groups/group.service';

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

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router,
              private groupService: GroupService) { }

  ngOnInit() {
    this.getProject();
    this.getAllGroups();
  }

  getProject() {
    this.projectService.getProject(this.route.snapshot.params.id).subscribe(data => {
      this.project = data;
    });
  }

  changeMode() {
    this.editMode = !this.editMode;
  }

  save() {
    this.projectService.updateProject(this.project).subscribe(data => {
      this.project = data;
    });
  }

  delete() {
    this.projectService.deleteProject(this.project).subscribe(res => {
      if (res.status === 200) {
        this.router.navigate(['/pages/project']);
      }
    });
  }

  deleteGroup(group: any) {
    this.project.group = this.project.group.filter(obj => {
      return group.group_id !== obj._id;
    });
    this.groups.push(group);
    this.save();
  }

  getAllGroups() {
    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
      for (const group of this.project.group) {
        this.groups = this.groups.filter(obj => {
          return obj._id !== group._id;
        });
      }
    });
  }

  showFormGroups() {
    this.show = !this.show;
  }

  addGroup() {
    for (const value of this.selectedValue) {
      const group = this.groups.find(obj => {
        return obj._id === value;
      });
      this.project.group.push(group);
      this.groups = this.groups.filter(obj => {
        return obj._id !== value;
      });
    }
    this.selectedValue = [];
    this.save();
  }
}
