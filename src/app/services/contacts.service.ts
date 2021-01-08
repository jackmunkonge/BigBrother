import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { DatabaseService } from './database.service';

@Injectable()
export class ContactsService {

  constructor(private http: HttpClient, private dbService: DatabaseService) { }

  public getContacts() {
    return this.dbService.getDatabase('contacts').find({})
      .then(res => res as Contact[])
      .then(data => data);
  }
}
