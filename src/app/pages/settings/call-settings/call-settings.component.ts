import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatabaseService } from '../../../services/database.service';
import { Call } from '../../../models/call';
import { CallService } from '../../../services/call.service';

@Component({
  selector: 'call-settings',
  templateUrl: './call-settings.component.html',
  styleUrls: ['./call-settings.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CallSettingsComponent implements OnInit {

  callDialog: boolean;
  calls: Call[];
  call: Call;
  selectedCalls: Call[];

  submitted: boolean;

  cols: any[];

  constructor(private confirmationService: ConfirmationService, private dbService: DatabaseService,
              private callService: CallService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.callService.getCalls()
      .then(data => this.calls = data);

    this.cols = [
      {field: 'name', header: 'Name'},
      {field: 'number', header: 'Phone Number'},
      {field: 'date', header: 'Date Called'},
      {field: 'incoming', header: 'Call Type'},
      {field: 'audio', header: 'Call Record'}
    ];
  }



  openNew() {
    this.call = {
      id: '',
      number: '',
      name: '',
      date: new Date(),
      incoming: true,
      audio: [{
        title: '',
        link: ''
      }]
    };
    this.submitted = false;
    this.callDialog = true;
  }

  deleteSelectedCalls() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected calls?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.calls = this.calls.filter(val => !this.selectedCalls.includes(val));
        this.selectedCalls.forEach(call => {
          this.dbService.getDatabase('calls').remove({id: call.id}, { multi: true });
        });
        this.selectedCalls = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Calls Deleted', life: 3000});
      }
    });
  }

  editCall(call: Call) {
    this.call = {...call};
    this.callDialog = true;
  }

  deleteCall(call: Call) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + call.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.calls = this.calls.filter(val => val.id !== call.id);
        this.dbService.getDatabase('calls').remove({id: call.id}, { multi: true });
        this.call = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Call Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.callDialog = false;
    this.submitted = false;
  }

  saveCall() {
    this.submitted = true;

    if (this.call.name.trim()) {
      if (this.call.id) {
        this.call[this.findIndexById(this.call.id)] = this.call;
        this.dbService.getDatabase('calls').update({id: this.call.id}, this.call, {});
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Call Updated', life: 3000});
      }
      else {
        this.call.id = this.createId();
        this.dbService.getDatabase('calls').insert(this.call);
        this.calls.push(this.call);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Call Created', life: 3000});
      }

      this.calls = [...this.calls];
      this.callDialog = false;
      this.call = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.calls.length; i++) {
      if (this.calls[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onReorder(event: any) {

    const dragCall = this.calls[event.dragIndex];
    const dropCall = this.calls[event.dropIndex];

    const tempId = dragCall.id;

    dragCall.id = dropCall.id;
    dropCall.id = tempId;

    this.dbService.getDatabase('calls').remove({id: dropCall.id})
      .then(
        this.dbService.getDatabase('calls').remove({id: dragCall.id})
      )
      .then(
        this.dbService.getDatabase('calls').insert([dragCall, dropCall])
      );

  }
}
