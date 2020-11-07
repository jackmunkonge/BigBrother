import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/contact';

@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];

  cols: any[];

  constructor(private contactsService: ContactsService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Contacts'}
    ]);
  }

  ngOnInit() {
    this.contactsService.getContacts().then(data => this.contacts = data);

    this.cols = [
      { field: 'name', header: 'Code' },
      { field: 'number', header: 'Phone Number' },
      { field: 'lastCalled', header: 'Last Called' }
    ];
  }

}
