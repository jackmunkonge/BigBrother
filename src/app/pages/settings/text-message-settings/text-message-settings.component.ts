import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TextMessage } from '../../../models/text-message';
import { DatabaseService } from '../../../services/database.service';
import { TextMessagesService } from '../../../services/text-messages.service';

@Component({
  selector: 'text-message-settings',
  templateUrl: './text-message-settings.component.html',
  styleUrls: ['./text-message-settings.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TextMessageSettingsComponent implements OnInit {

  textMessageDialog: boolean;
  textMessages: TextMessage[];
  textMessage: TextMessage;
  selectedTextMessages: TextMessage[];

  submitted: boolean;

  cols: any[];

  constructor(private confirmationService: ConfirmationService, private dbService: DatabaseService,
              private textMessagesService: TextMessagesService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.textMessagesService.getTextMessages()
      .then(data => this.textMessages = data);

    this.cols = [
      {field: 'name', header: 'Name'}
    ];
  }



  openNew() {
    this.textMessage = {
      id: '',
      name: '',
      chat: {
        id: '',
        messages: [
          {
            id: '',
            incoming: false,
            body: '',
            date: new Date()
          }
        ],
      }
    };
    this.submitted = false;
    this.textMessageDialog = true;
  }

  deleteSelectedTextMessages() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected text messages?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.textMessages = this.textMessages.filter(val => !this.selectedTextMessages.includes(val));
        this.selectedTextMessages.forEach(message => {
          this.dbService.getDatabase('textMessages').remove({id: message.id}, { multi: true });
        });
        this.selectedTextMessages = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Text Messages Deleted', life: 3000});
      }
    });
  }

  editTextMessage(text: TextMessage) {
    this.textMessage = {...text};
    this.textMessageDialog = true;
  }

  deleteTextMessage(text: TextMessage) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + text.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.textMessages = this.textMessages.filter(val => val.id !== text.id);
        this.dbService.getDatabase('textMessages').remove({id: text.id}, { multi: true });
        this.textMessage = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Text Message Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.textMessageDialog = false;
    this.submitted = false;
  }

  saveTextMessage() {
    this.submitted = true;

    if (this.textMessage.name.trim()) {
      if (this.textMessage.id) {
        this.textMessages[this.findIndexById(this.textMessage.id)] = this.textMessage;
        this.dbService.getDatabase('textMessages').update({id: this.textMessage.id}, this.textMessage, {});
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Text Message Updated', life: 3000});
      }
      else {
        this.textMessage.id = this.createId();
        this.textMessage.chat.id = this.createId();
        this.textMessage.chat.messages.forEach(message => {
          message.id = this.createId();
        });
        this.dbService.getDatabase('textMessages').insert(this.textMessage);
        this.textMessages.push(this.textMessage);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Text Message Created', life: 3000});
      }

      this.textMessages = [...this.textMessages];
      this.textMessageDialog = false;
      this.textMessage = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.textMessages.length; i++) {
      if (this.textMessages[i].id === id) {
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

  addMessage() {
    this.textMessage.chat.messages.push({
      id: '',
      incoming: false,
      body: '',
      date: new Date()
    })
  }

  removeMessage() {
    if (this.textMessage.chat.messages.length > 1) {
      this.textMessage.chat.messages.shift();
    }
  }

}
