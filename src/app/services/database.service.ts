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
