import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Contact } from '../../../models/contact';
import { DatabaseService } from '../../../services/database.service';
import { CallService } from '../../../services/call.service';
import { BlockedNumber } from '../../../models/blocked-number';
import { BlockedNumberService } from '../../../services/blocked-number.service';

@Component({
  selector: 'blocked-calls-settings',
  templateUrl: './blocked-calls-settings.component.html',
  styleUrls: ['./blocked-calls-settings.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class BlockedCallsSettingsComponent implements OnInit {

  blockedNumberDialog: boolean;
  blockedNumbers: BlockedNumber[];
  blockedNumber: BlockedNumber;
  selectedBlockedNumbers: BlockedNumber[];

  submitted: boolean;

  cols: any[];

  constructor(private confirmationService: ConfirmationService, private dbService: DatabaseService,
              private blockedNumberService: BlockedNumberService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.blockedNumberService.getCalls()
      .then(data => {
        if (data) {
          this.blockedNumbers = data;
        } else {
          this.blockedNumbers = [];
        }
      });

    this.cols = [
      {field: 'number', header: 'Restricted Number'},
      {field: 'blocked', header: 'Blocked'}
    ];
  }


  openNew() {
    this.blockedNumber = {
      id: '',
      number: '',
      blocked: false
    };
    this.submitted = false;
    this.blockedNumberDialog = true;
  }

  deleteSelectedBlockedNumbers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected blocked numbers?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.blockedNumbers = this.blockedNumbers.filter(val => !this.selectedBlockedNumbers.includes(val));
        this.selectedBlockedNumbers.forEach(number => {
          this.dbService.getDatabase('blocked-calls').remove({id: number.id}, { multi: true });
        });
        this.selectedBlockedNumbers = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Blocked Numbers Deleted', life: 3000});
      }
    });
  }

  editBlockedNumber(number: BlockedNumber) {
    this.blockedNumber = {...number};
    this.blockedNumberDialog = true;
  }

  deleteBlockedNumber(number: BlockedNumber) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete blocked number ' + number.number + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.blockedNumbers = this.blockedNumbers.filter(val => val.id !== number.id);
        this.dbService.getDatabase('blocked-calls').remove({id: number.id}, { multi: true });
        this.blockedNumber = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Blocked Number Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.blockedNumberDialog = false;
    this.submitted = false;
  }

  saveBlockedNumber() {
    this.submitted = true;

    if (this.blockedNumber.number) {
      if (this.blockedNumber.id) {
        this.blockedNumbers[this.findIndexById(this.blockedNumber.id)] = this.blockedNumber;
        this.dbService.getDatabase('blocked-calls').update({id: this.blockedNumber.id}, this.blockedNumber, {});
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Blocked Number Updated', life: 3000});
      }
      else {
        this.blockedNumber.id = this.createId();
        this.dbService.getDatabase('blocked-calls').insert(this.blockedNumber);
        this.blockedNumbers.push(this.blockedNumber);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Blocked Number Created', life: 3000});
      }

      this.blockedNumbers = [...this.blockedNumbers];
      this.blockedNumberDialog = false;
      this.blockedNumber = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.blockedNumbers.length; i++) {
      if (this.blockedNumbers[i].id === id) {
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

    const dragNumber = this.blockedNumbers[event.dragIndex];
    const dropNumber = this.blockedNumbers[event.dropIndex];

    const tempId = dragNumber.id;

    dragNumber.id = dropNumber.id;
    dropNumber.id = tempId;

    this.dbService.getDatabase('blocked-calls').remove({id: dropNumber.id})
      .then(
        this.dbService.getDatabase('blocked-calls').remove({id: dragNumber.id})
      )
      .then(
        this.dbService.getDatabase('blocked-calls').insert([dragNumber, dropNumber])
      );

  }

}
