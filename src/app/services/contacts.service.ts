import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable()
export class ContactsService {

  constructor(private http: HttpClient) { }

  public getContacts() {
    return this.http.get<any>('assets/data/contacts.json')
      .toPromise()
      .then(res => res.data as Contact[])
      .then(data => data);
  }
}
