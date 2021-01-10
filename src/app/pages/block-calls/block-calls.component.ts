import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import { BlockedNumberService } from '../../services/blocked-number.service';
import { BlockedNumber } from '../../models/blocked-number';

@Component({
  templateUrl: './block-calls.component.html',
  styleUrls: ['./block-calls.component.scss']
})
export class BlockCallsComponent implements OnInit {

  calls: BlockedNumber[];

  constructor(private blockedNumberService: BlockedNumberService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Block Calls'}
    ]);
  }
  ngOnInit() {
    this.blockedNumberService.getCalls().then(data => this.calls = data);
  }

}
