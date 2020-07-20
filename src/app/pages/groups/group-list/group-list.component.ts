import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'ngx-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})

export class GroupListComponent implements OnInit {

  private groups;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('https://workandout.herokuapp.com/groups').subscribe((data) => {
      this.groups = data;
    });
  }

}
