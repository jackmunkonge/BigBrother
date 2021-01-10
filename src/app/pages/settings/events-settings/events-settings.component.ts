import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatabaseService } from '../../../services/database.service';
import { CalendarEvent } from '../../../models/calendar-event';
import { EventService } from '../../../services/eventservice';

@Component({
  selector: 'events-settings',
  templateUrl: './events-settings.component.html',
  styleUrls: ['./events-settings.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class EventsSettingsComponent implements OnInit {

  eventDialog: boolean;
  events: CalendarEvent[];
  event: CalendarEvent;
  selectedEvents: CalendarEvent[];

  submitted: boolean;

  cols: any[];

  constructor(private confirmationService: ConfirmationService, private dbService: DatabaseService,
              private eventService: EventService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.eventService.getEvents()
      .then(data => this.events = data);

    this.cols = [
      {field: 'title', header: 'Title'},
      {field: 'start', header: 'Start Date'},
      {field: 'end', header: 'End Date'}
    ];
  }


  openNew() {
    this.event = {
      title: '',
      start: new Date(),
      end: new Date()
    };
    this.submitted = false;
    this.eventDialog = true;
  }

  deleteSelectedEvents() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected events?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.events = this.events.filter(val => !this.selectedEvents.includes(val));
        this.selectedEvents.forEach(event => {
          this.dbService.getDatabase('events').remove({id: event.id}, { multi: true });
        });
        this.selectedEvents = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Events Deleted', life: 3000});
      }
    });
  }

  editEvent(event: CalendarEvent) {
    this.event = {...event};
    this.eventDialog = true;
  }

  deleteEvent(event: CalendarEvent) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + event.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.events = this.events.filter(val => val.id !== event.id);
        this.dbService.getDatabase('events').remove({id: event.id}, { multi: true });
        this.event = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Event Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.eventDialog = false;
    this.submitted = false;
  }

  saveEvent() {
    this.submitted = true;

    if (this.event.title) {
      if (this.event.id) {
        this.events[this.findIndexById(this.event.id)] = this.event;
        this.dbService.getDatabase('events').update({id: this.event.id}, this.event, {});
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Event Updated', life: 3000});
      }
      else {
        this.event.id = this.createId();
        this.dbService.getDatabase('events').insert(this.event);
        this.events.push(this.event);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Event Created', life: 3000});
      }

      this.events = [...this.events];
      this.eventDialog = false;
      this.event = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.events.length; i++) {
      if (this.events[i].id === id) {
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
