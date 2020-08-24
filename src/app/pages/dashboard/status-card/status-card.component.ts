import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  templateUrl: './status-card.component.html',
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() src: string;
  @Input() pageName: string;

  constructor(private router: Router) { }

  moveToPlatformPage() {
    this.router.navigate([`/pages/${this.pageName}`]);
  }
}
