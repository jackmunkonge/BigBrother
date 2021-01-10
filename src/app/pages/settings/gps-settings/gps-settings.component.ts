import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Contact } from '../../../models/contact';
import { DatabaseService } from '../../../services/database.service';
import { Gps } from '../../../models/gps';
import { GpsService } from '../../../services/gps.service';

@Component({
  selector: 'gps-settings',
  templateUrl: './gps-settings.component.html',
  styleUrls: ['./gps-settings.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class GpsSettingsComponent implements OnInit {

  gpsDialog: boolean;
  gpsLocations: Gps[];
  gpsLocation: Gps;
  selectedGpsLocations: Gps[];

  submitted: boolean;

  cols: any[];

  constructor(private confirmationService: ConfirmationService, private dbService: DatabaseService,
              private gpsService: GpsService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.gpsService.getGpsLocations()
      .then(data => this.gpsLocations = data);

    this.cols = [
      {field: 'address', header: 'Address'},
      {field: 'locationDate', header: 'Location Date'},
      {field: 'lat', header: 'Latitude'},
      {field: 'long', header: 'Longitude'}
    ];
  }


  openNew() {
    this.gpsLocation = {};
    this.submitted = false;
    this.gpsDialog = true;
  }

  deleteSelectedGpsLocations() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected gps locations?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.gpsLocations = this.gpsLocations.filter(val => !this.selectedGpsLocations.includes(val));
        this.selectedGpsLocations.forEach(location => {
          this.dbService.getDatabase('gps').remove({id: location.id}, { multi: true });
        });
        this.selectedGpsLocations = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Location Deleted', life: 3000});
      }
    });
  }

  editLocation(location: Gps) {
    this.gpsLocation = {...location};
    this.gpsDialog = true;
  }

  deleteLocation(location: Gps) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this location?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.gpsLocations = this.gpsLocations.filter(val => val.id !== location.id);
        this.dbService.getDatabase('gps').remove({id: location.id}, { multi: true });
        this.gpsLocation = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Location Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.gpsDialog = false;
    this.submitted = false;
  }

  saveLocation() {
    this.submitted = true;

    if (this.gpsLocation) {
      if (this.gpsLocation.id) {
        this.gpsLocations[this.findIndexById(this.gpsLocation.id)] = this.gpsLocation;
        this.dbService.getDatabase('gps').update({id: this.gpsLocation.id}, this.gpsLocation, {});
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Gps Location Updated', life: 3000});
      }
      else {
        this.gpsLocation.id = this.createId();
        this.dbService.getDatabase('gps').insert(this.gpsLocation);
        this.gpsLocations.push(this.gpsLocation);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Gps Location Created', life: 3000});
      }

      this.gpsLocations = [...this.gpsLocations];
      this.gpsDialog = false;
      this.gpsLocation = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.gpsLocations.length; i++) {
      if (this.gpsLocations[i].id === id) {
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

    const dragLocation = this.gpsLocations[event.dragIndex];
    const dropLocation = this.gpsLocations[event.dropIndex];

    const tempId = dragLocation.id;

    dragLocation.id = dropLocation.id;
    dropLocation.id = tempId;

    this.dbService.getDatabase('gps').remove({id: dropLocation.id})
      .then(
        this.dbService.getDatabase('gps').remove({id: dragLocation.id})
      )
      .then(
        this.dbService.getDatabase('gps').insert([dragLocation, dropLocation])
      );

  }

}
