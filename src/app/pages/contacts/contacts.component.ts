import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/contact';
import { SelectItem } from 'primeng/api';
import { TextMessage } from '../../models/text-message';

@Component({
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];
  cols: any[];
  loading = true;

  constructor(private contactsService: ContactsService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Contacts'}
    ]);
  }

  ngOnInit() {
    this.cols = [
      {field: 'name', header: 'Name'},
      {field: 'number', header: 'Phone Number'},
      {field: 'lastCalled', header: 'Last Called'}
    ];
    this.contactsService.getContacts()
      .then(data => this.contacts = data)
      .then(() => this.loading = false);
  }
}
