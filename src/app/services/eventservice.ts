import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { CalendarEvent } from '../models/calendar-event';

@Injectable()
export class EventService {

    constructor(private dbService: DatabaseService) { }

    getEvents() {
    return this.dbService.getDatabase('events').find({}).sort((a,b) => a.id > b.id ? 1 : -1)
      .then(res => res as CalendarEvent[])
      .then(data => data);
    }
}
