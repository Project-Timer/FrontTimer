import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProjectService} from '../project.service';
import {ActivatedRoute} from '@angular/router';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';

@Component({
  selector: 'ngx-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  private projects;
  private show = false;
  private user;
  private timer;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private cr: ChangeDetectorRef,
              private tokenService: NbTokenService) {
  }

  async ngOnInit() {
    this.projects = this.route.snapshot.data.projects;
    this.timer = this.route.snapshot.data.timer;
    this.timer = this.timer.find(obj => {
      return obj.dateEnd === undefined;
    });
    this.tokenService.get()
      .subscribe((token: NbAuthJWTToken) => {
        this.user = token.isValid() ? token.getPayload() : {};
      });
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

  getTimer(timer) {
    this.timer = timer;
    this.cr.detectChanges();
  }
}
