import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatabaseService } from '../../../services/database.service';
import { App } from '../../../models/app';
import { AppService } from '../../../services/app.service';
import { FileUploadService } from '../../../services/file-upload.service';

@Component({
  selector: 'blocked-app-settings',
  templateUrl: './blocked-app-settings.component.html',
  styleUrls: ['./blocked-app-settings.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class BlockedAppSettingsComponent implements OnInit {

  uploadedFile: any;

  appDialog: boolean;
  apps: App[];
  app: App;
  selectedApps: App[];

  submitted: boolean;

  cols: any[];

  constructor(private confirmationService: ConfirmationService, private dbService: DatabaseService,
              private appService: AppService, private messageService: MessageService,
              private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.appService.getApps()
      .then(data => this.apps = data);

    this.cols = [
      {field: 'imgUrl', header: 'Image Url'},
      {field: 'title', header: 'App Title'},
      {field: 'blocked', header: 'Blocked'}
    ];
  }


  openNew() {
    this.app = {
      id: '',
      imgUrl: '',
      title: '',
      blocked: false
    };
    this.submitted = false;
    this.appDialog = true;
  }

  deleteSelectedApps() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected blocked apps?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apps = this.apps.filter(val => !this.selectedApps.includes(val));
        this.selectedApps.forEach(app => {
          this.fileUploadService.deleteImageFile(app.imgUrl);
          this.dbService.getDatabase('apps').remove({id: app.id}, { multi: true });
        });
        this.selectedApps = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Apps Deleted', life: 3000});
      }
    });
  }

  editApp(app: App) {
    this.app = {...app};
    this.appDialog = true;
  }

  deleteApp(app: App) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + app.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apps = this.apps.filter(val => val.id !== app.id);
        this.fileUploadService.deleteImageFile(app.imgUrl);
        this.dbService.getDatabase('apps').remove({id: app.id}, { multi: true });
        this.app = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'App Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.appDialog = false;
    this.submitted = false;
  }

  saveApp() {
    this.submitted = true;

    if (this.app.title) {
      if (this.app.id) {
        this.apps[this.findIndexById(this.app.id)] = this.app;
        this.dbService.getDatabase('apps').update({id: this.app.id}, this.app, {});
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'App Updated', life: 3000});
      }
      else {
        this.app.id = this.createId();
        this.dbService.getDatabase('apps').insert(this.app);
        this.apps.push(this.app);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'App Created', life: 3000});
      }

      this.apps = [...this.apps];
      this.appDialog = false;
      this.app = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.apps.length; i++) {
      if (this.apps[i].id === id) {
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

  onUpload(event) {
    this.fileUploadService.saveImageFile(event.files[0].path, event.files[0].name)
      .then(file => {
        this.uploadedFile = event.files[0];
        this.fileUploadService.deleteImageFile(this.app.imgUrl);
        this.app.imgUrl = file.path;
        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
      })
      .catch(err => {
        console.log(err);
        this.messageService.add({severity: 'danger', summary: 'Upload Error', detail: 'Could not upload file'});
      });
  }

}
