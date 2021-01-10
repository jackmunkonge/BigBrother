import { Injectable } from '@angular/core';
import { Call } from '../models/call';
import { DatabaseService } from './database.service';

@Injectable()
export class CallService {

  constructor(private dbService: DatabaseService) { }

  getCalls() {
    return this.dbService.getDatabase('calls').find({}).sort((a,b) => a.id > b.id ? 1 : -1)
      .then(res => res as Call[])
      .then(data => data);
  }
}
