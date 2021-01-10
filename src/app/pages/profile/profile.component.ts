import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../app.breadcrumb.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Profile'}
    ]);
  }

  ngOnInit(): void {
  }

}
