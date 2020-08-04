import {Component, OnInit} from '@angular/core';
import {GroupService} from '../group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit {
  group: {
    name: string,
    user: [],
  };

  constructor(private groupService: GroupService, private router: Router) {
  }

  ngOnInit() {
    this.group = {
      name: '',
      user: [],
    };
  }

  save() {
    this.groupService.addGroup(this.group).subscribe(res => {
      this.router.navigate(['/pages/groups']);
    });
  }
}
