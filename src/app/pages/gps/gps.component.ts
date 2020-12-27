import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import { Gps } from '../../models/gps';
import { GpsService } from '../../services/gps.service';

@Component({
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss']
})
export class GpsComponent implements OnInit {

  gpsLocations: Gps[];

  constructor(private gpsService: GpsService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'GPS'}
    ]);
  }

  ngOnInit() {
    this.gpsService.getGpsLocations().then(data => this.gpsLocations = data);
  }
}
