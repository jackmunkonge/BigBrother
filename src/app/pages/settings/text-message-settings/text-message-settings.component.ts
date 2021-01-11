import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TextMessage } from '../../../models/text-message';
import { DatabaseService } from '../../../services/database.service';
import { TextMessagesService } from '../../../services/text-messages.service';
import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'text-message-settings',
  templateUrl: './text-message-settings.component.html',
  styleUrls: ['./text-message-settings.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TextMessageSettingsComponent implements OnInit {

  @Input() type: string = 'text';
  databaseName: string = 'textMessages';

  uploadedFile: any;
  textMessageDialog: boolean;
  textMessages: TextMessage[];
  textMessage: TextMessage;
  selectedTextMessages: TextMessage[];

  submitted: boolean;

  cols: any[];

  constructor(private confirmationService: ConfirmationService, private dbService: DatabaseService,
              private textMessagesService: TextMessagesService, private messageService: MessageService,
              private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    switch (this.type) {
      case 'text':
        this.textMessagesService.getTextMessages()
          .then(data => this.textMessages = data);
        this.databaseName = 'textMessages';
        break;
      case 'whatsapp':
        this.textMessagesService.getWhatsAppMessages()
          .then(data => this.textMessages = data);
        this.databaseName = 'whatsapp';
        break;
    }

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
            date: new Date(),
            photo: {
              src: ''
            }
          }
        ],
      }
    };
    this.submitted = false;
    this.textMessageDialog = true;
  }

  deleteSelectedTextMessages() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected messages?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.textMessages = this.textMessages.filter(val => !this.selectedTextMessages.includes(val));
        this.selectedTextMessages.forEach(message => {
          message.chat.messages.forEach(item => {
            if (item.photo) {
              this.fileUploadService.deleteImageFile(item.photo.src);
            }
          });
          this.dbService.getDatabase(this.databaseName).remove({id: message.id}, { multi: true });
        });
        this.selectedTextMessages = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Messages Deleted', life: 3000});
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
        text.chat.messages.forEach(item => {
          if (item.photo) {
            this.fileUploadService.deleteImageFile(item.photo.src);
          }
        });
        this.dbService.getDatabase(this.databaseName).remove({id: text.id}, { multi: true });
        this.textMessage = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Message Deleted', life: 3000});
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
        this.dbService.getDatabase(this.databaseName).update({id: this.textMessage.id}, this.textMessage, {});
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Message Updated', life: 3000});
      }
      else {
        this.textMessage.id = this.createId();
        this.textMessage.chat.id = this.createId();
        this.textMessage.chat.messages.forEach(message => {
          message.id = this.createId();
        });
        this.dbService.getDatabase(this.databaseName).insert(this.textMessage);
        this.textMessages.push(this.textMessage);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Message Created', life: 3000});
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
      date: new Date(),
      photo: {
        src: ''
      }
    })
  }

  removeMessage(messageIndex: string) {
    if (this.textMessage.chat.messages.length > 1) {
      this.textMessage.chat.messages.splice(Number(messageIndex), 1);
      this.fileUploadService.deleteImageFile(this.textMessage.chat.messages[messageIndex].photo.src);
    }
  }

  onUpload(event, chatMessageIndex) {
    this.fileUploadService.saveImageFile(event.files[0].path, event.files[0].name)
      .then(file => {
        this.uploadedFile = event.files[0];
        if (!!this.textMessage.chat.messages[chatMessageIndex].photo && this.textMessage.chat.messages[chatMessageIndex].photo.src !== '') {
          this.fileUploadService.deleteImageFile(this.textMessage.chat.messages[chatMessageIndex].photo.src);
        }
        this.textMessage.chat.messages[chatMessageIndex].photo.src = file.path;
        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
      })
      .catch(err => {
        console.log(err);
        this.messageService.add({severity: 'danger', summary: 'Upload Error', detail: 'Could not upload file'});
      });
  }
}
