import { Injectable } from '@angular/core';
import { AppConfig } from '../../environments/environment';
const app = require('electron').remote.app
const Datastore = require('nedb-promises');

@Injectable()
export class DatabaseService {

  databases = {};

  constructor() {
    this.databases['contacts'] = this.dbFactory('contacts.db');
    this.databases['textMessages'] = this.dbFactory('text-messages.db');
    this.databases['calls'] = this.dbFactory('calls.db');
    this.databases['events'] = this.dbFactory('events.db');
    this.databases['photos'] = this.dbFactory('photos.db');
    this.databases['whatsapp'] = this.dbFactory('whatsapp.db');
    this.databases['gps'] = this.dbFactory('gps.db');
    this.databases['blocked-calls'] = this.dbFactory('blocked-calls.db');
    this.databases['apps'] = this.dbFactory('apps.db');
    this.databases['profile'] = this.dbFactory('profile.db');
  }

  getDatabase(name) {
    return this.databases[name];
  }

  private dbFactory(fileName) {
    return Datastore.create({
      filename: `${AppConfig.production ? app.getPath("userData") : '.'}/data/${fileName}`,
      timestampData: true,
      autoload: true
    });

  }
}
