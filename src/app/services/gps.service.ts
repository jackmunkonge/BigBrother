import { Injectable } from '@angular/core';
import { Gps } from '../models/gps';
import { DatabaseService } from './database.service';

@Injectable()
export class GpsService {

  constructor(private dbService: DatabaseService) { }

  getGpsLocations() {
    return this.dbService.getDatabase('gps').find({}).sort((a,b) => a.id > b.id ? 1 : -1)
      .then(res => res as Gps[])
      .then(data => data);
  }
}
