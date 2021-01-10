import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatabaseService } from '../../../services/database.service';
import { Image } from '../../../models/image';
import { PhotoService } from '../../../services/photoservice';

@Component({
  selector: 'photo-settings',
  templateUrl: './photo-settings.component.html',
  styleUrls: ['./photo-settings.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PhotoSettingsComponent implements OnInit {
  photoDialog: boolean;
  photos: Image[];
  photo: Image;
  selectedPhotos: Image[];

  submitted: boolean;

  cols: any[];

  constructor(private confirmationService: ConfirmationService, private dbService: DatabaseService,
              private photoService: PhotoService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.photoService.getImages()
      .then(data => this.photos = data);

    this.cols = [
      {field: 'previewImageSrc', header: 'Image Preview'},
      {field: 'thumbnailImageSrc', header: 'Image Thumbnail'},
      {field: 'alt', header: 'Alt Text'},
      {field: 'title', header: 'Title'},
      {field: 'dateCreated', header: 'Date Created'}
    ];
  }


  openNew() {
    this.photo = {
      id: '',
      previewImageSrc: '',
      thumbnailImageSrc: '',
      alt: '',
      title: '',
      dateCreated: new Date()
    };
    this.submitted = false;
    this.photoDialog = true;
  }

  deleteSelectedPhotos() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected photos?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.photos = this.photos.filter(val => !this.selectedPhotos.includes(val));
        this.selectedPhotos.forEach(photo => {
          this.dbService.getDatabase('photos').remove({id: photo.id}, { multi: true });
        });
        this.selectedPhotos = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Photos Deleted', life: 3000});
      }
    });
  }

  editPhoto(photo: Image) {
    this.photo = {...photo};
    this.photoDialog = true;
  }

  deletePhoto(photo: Image) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + photo.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.photos = this.photos.filter(val => val.id !== photo.id);
        this.dbService.getDatabase('photos').remove({id: photo.id}, { multi: true });
        this.photo = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Photo Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.photoDialog = false;
    this.submitted = false;
  }

  savePhoto() {
    this.submitted = true;

    if (this.photo.title) {
      this.photo.alt = this.photo.title;
      if (this.photo.id) {
        this.photos[this.findIndexById(this.photo.id)] = this.photo;
        this.dbService.getDatabase('photos').update({id: this.photo.id}, this.photo, {});
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Photo Updated', life: 3000});
      }
      else {
        this.photo.id = this.createId();
        this.dbService.getDatabase('photos').insert(this.photo);
        this.photos.push(this.photo);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Photo Created', life: 3000});
      }

      this.photos = [...this.photos];
      this.photoDialog = false;
      this.photo = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.photos.length; i++) {
      if (this.photos[i].id === id) {
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

}
