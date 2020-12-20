import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TextMessage } from '../models/text-message';

@Injectable()
export class TextMessagesService {

  constructor(private http: HttpClient) { }

  getTextMessages() {
    return this.http.get<any>('assets/data/text-messages.json')
      .toPromise()
      .then(res => res.data as TextMessage[])
      .then(data => data);
  }
}
