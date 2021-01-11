import { Injectable } from '@angular/core';
import { TextMessage } from '../models/text-message';
import { DatabaseService } from './database.service';

@Injectable()
export class TextMessagesService {

  constructor(private dbService: DatabaseService) { }

  getTextMessages() {
    return this.dbService.getDatabase('textMessages').find({})
      .then(res => res as TextMessage[])
      .then(data => data);
  }

  getWhatsAppMessages() {
    return this.dbService.getDatabase('whatsapp').find({})
      .then(res => res as TextMessage[])
      .then(data => data);
  }

}
