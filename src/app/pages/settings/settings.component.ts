import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Contact } from '../../models/contact';
import { ContactsService } from '../../services/contacts.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class SettingsComponent implements OnInit {

  contactDialog: boolean;
  contacts: Contact[];
  contact: Contact;
  selectedContacts: Contact[];

  submitted: boolean;

  cols: any[];

  constructor(private contactsService: ContactsService, private messageService: MessageService,
              private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Settings'}
    ]);
  }

  ngOnInit() {
    this.contactsService.getContacts()
      .then(data => this.contacts = data);

    this.cols = [
      {field: 'name', header: 'Name'},
      {field: 'number', header: 'Phone Number'},
      {field: 'lastCalled', header: 'Last Called'}
    ];
  }

  openNew() {
    this.contact = {};
    this.submitted = false;
    this.contactDialog = true;
  }

  deleteSelectedContacts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected contacts?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contacts = this.contacts.filter(val => !this.selectedContacts.includes(val));
        this.selectedContacts = null;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Contacts Deleted', life: 3000});
      }
    });
  }

  editContact(contact: Contact) {
    this.contact = {...contact};
    this.contactDialog = true;
  }

  deleteContact(contact: Contact) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + contact.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contacts = this.contacts.filter(val => val.id !== contact.id);
        this.contact = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Contact Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.contactDialog = false;
    this.submitted = false;
  }

  saveContact() {
    this.submitted = true;

    if (this.contact.name.trim()) {
      if (this.contact.id) {
        this.contacts[this.findIndexById(this.contact.id)] = this.contact;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Contact Updated', life: 3000});
      }
      else {
        this.contact.id = this.createId();
        this.contacts.push(this.contact);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Contact Created', life: 3000});
      }

      this.contacts = [...this.contacts];
      this.contactDialog = false;
      this.contact = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].id === id) {
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
