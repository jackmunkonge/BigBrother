import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import { Call } from '../../models/call';
import { CallService } from '../../services/call.service';

@Component({
  templateUrl: './block-calls.component.html',
  styleUrls: ['./block-calls.component.scss']
})
export class BlockCallsComponent implements OnInit {

  calls: Call[];

  constructor(private callService: CallService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Block Calls'}
    ]);
  }
  ngOnInit() {
    this.callService.getCalls().then(data => this.calls = data);
  }

}
