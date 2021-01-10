import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { BlockedNumber } from '../models/blocked-number';

@Injectable()
export class BlockedNumberService {

  constructor(private dbService: DatabaseService) { }

  getCalls() {
    return this.dbService.getDatabase('blocked-calls').find({}).sort((a,b) => a.id > b.id ? 1 : -1)
      .then(res => res as BlockedNumber[])
      .then(data => data);
  }
}
