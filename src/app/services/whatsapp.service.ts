import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { TextMessage } from '../models/text-message';

@Injectable()
export class WhatsappService {

  constructor(private dbService: DatabaseService) { }

  getMessages() {
    return this.dbService.getDatabase('whatsapp').find({})
      .then(res => res as TextMessage[])
      .then(data => data);
  }
}
