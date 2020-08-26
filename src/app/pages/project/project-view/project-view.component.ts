import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../../groups/group.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
})
export class ProjectViewComponent implements OnInit {
  project;
  editMode = false;
  show = false;
  groups;
  selectedValue = [];

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router,
              private groupService: GroupService, private toaster: NbToastrService) {
  }

  ngOnInit() {
    this.project = this.route.snapshot.data.project;
    this.getAllGroups();
  }

  changeMode() {
    this.editMode = !this.editMode;
  }

  save() {
    const newProject = {...this.project};
    newProject.groups = [];
    for (const groupValue of this.project.groups) {
      newProject.groups.push(groupValue._id);
    }
    newProject.admin = this.project.admin._id;
    this.projectService.updateProject(newProject).subscribe(
      data => {
        this.toaster.success('Project successfully updated', 'Success', {'duration': 5000});
        this.project = data;
      },
      error => {
        this.toaster.danger(error.error.message, 'Oops...', {'duration': 5000});
      },
    );
  }

  delete() {
    this.projectService.deleteProject(this.project).subscribe(
      res => {
        this.toaster.success('Project successfully deleted', 'Success', {'duration': 5000});
        this.router.navigate(['/pages/project']);
      },
      error => {
        this.toaster.danger(error.error.message, 'Oops...', {'duration': 5000});
      },
    );
  }

  deleteGroup(group: any) {
    this.project.groups = this.project.groups.filter(obj => {
      return group._id !== obj._id;
    });
    this.groups.push(group);
    this.save();
  }

  getAllGroups() {
    this.groupService.getAllGroups().subscribe(data => {
      this.groups = data;
      for (const group of this.project.groups) {
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
      this.project.groups.push(group);
      this.groups = this.groups.filter(obj => {
        return obj._id !== value;
      });
    }
    this.selectedValue = [];
    this.save();
  }
}
