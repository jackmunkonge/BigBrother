import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TextMessage } from '../../../models/text-message';
import { DatabaseService } from '../../../services/database.service';
import { TextMessagesService } from '../../../services/text-messages.service';
import { WhatsappService } from '../../../services/whatsapp.service';

@Component({
  selector: 'whatsapp-settings',
  templateUrl: './whatsapp-settings.component.html',
  styleUrls: ['./whatsapp-settings.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class WhatsappSettingsComponent implements OnInit {

  whatsAppDialog: boolean;
  whatsAppMessages: TextMessage[];
  whatsAppMessage: TextMessage;
  selectedWhatsAppMessages: TextMessage[];

  submitted: boolean;

  cols: any[];

  constructor(private confirmationService: ConfirmationService, private dbService: DatabaseService,
              private whatsAppService: WhatsappService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.whatsAppService.getMessages()
      .then(data => this.whatsAppMessages = data);

    this.cols = [
      {field: 'name', header: 'Name'}
    ];
  }



  openNew() {
    this.whatsAppMessage = {
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
    this.whatsAppDialog = true;
  }

  deleteSelectedWhatsAppMessages() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected whatsapp messages?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.whatsAppMessages = this.whatsAppMessages.filter(val => !this.selectedWhatsAppMessages.includes(val));
        this.selectedWhatsAppMessages.forEach(message => {
          this.dbService.getDatabase('whatsapp').remove({id: message.id}, { multi: true });
        });
        this.selectedWhatsAppMessages = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'WhatsApp Messages Deleted', life: 3000});
      }
    });
  }

  editWhatsAppMessage(text: TextMessage) {
    this.whatsAppMessage = {...text};
    this.whatsAppDialog = true;
  }

  deleteWhatsAppMessage(text: TextMessage) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + text.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.whatsAppMessages = this.whatsAppMessages.filter(val => val.id !== text.id);
        this.dbService.getDatabase('whatsapp').remove({id: text.id}, { multi: true });
        this.whatsAppMessage = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'WhatsApp Message Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.whatsAppDialog = false;
    this.submitted = false;
  }

  saveWhatsAppMessage() {
    this.submitted = true;

    if (this.whatsAppMessage.name.trim()) {
      if (this.whatsAppMessage.id) {
        this.whatsAppMessages[this.findIndexById(this.whatsAppMessage.id)] = this.whatsAppMessage;
        this.dbService.getDatabase('whatsapp').update({id: this.whatsAppMessage.id}, this.whatsAppMessage, {});
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'WhatsApp Message Updated', life: 3000});
      }
      else {
        this.whatsAppMessage.id = this.createId();
        this.whatsAppMessage.chat.id = this.createId();
        this.whatsAppMessage.chat.messages.forEach(message => {
          message.id = this.createId();
        });
        this.dbService.getDatabase('whatsapp').insert(this.whatsAppMessage);
        this.whatsAppMessages.push(this.whatsAppMessage);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'WhatsApp Message Created', life: 3000});
      }

      this.whatsAppMessages = [...this.whatsAppMessages];
      this.whatsAppDialog = false;
      this.whatsAppMessage = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.whatsAppMessages.length; i++) {
      if (this.whatsAppMessages[i].id === id) {
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
    this.whatsAppMessage.chat.messages.push({
      id: '',
      incoming: false,
      body: '',
      date: new Date()
    })
  }

  removeMessage() {
    if (this.whatsAppMessage.chat.messages.length > 1) {
      this.whatsAppMessage.chat.messages.shift();
    }
  }

}
