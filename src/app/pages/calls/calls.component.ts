import { Component, OnInit } from '@angular/core';
import { Call } from '../../models/call';
import { CallService } from '../../services/call.service';
import { BreadcrumbService } from '../../app.breadcrumb.service';

@Component({
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss']
})
export class CallsComponent implements OnInit {

  calls: Call[];

  constructor(private callService: CallService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Calls'}
    ]);
  }

  ngOnInit(): void {
    this.callService.getCalls().then(data => this.calls = data);
  }

}
