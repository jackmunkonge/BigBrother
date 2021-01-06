import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import { AppService } from '../../services/app.service';
import { App } from '../../models/app';

@Component({
  templateUrl: './block-applications.component.html',
  styleUrls: ['./block-applications.component.scss']
})
export class BlockApplicationsComponent implements OnInit {

  apps: App[];

  constructor(private appService: AppService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Block Applications'}
    ]);
  }

  ngOnInit() {
    this.appService.getApps().then(data => this.apps = data);
  }
}
