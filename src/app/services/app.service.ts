import { Injectable } from '@angular/core';
import { App } from '../models/app';
import { DatabaseService } from './database.service';

@Injectable()
export class AppService {

  constructor(private dbService: DatabaseService) { }

  getApps() {
    return this.dbService.getDatabase('apps').find({})
      .then(res => res as App[])
      .then(data => data);
  }
}
