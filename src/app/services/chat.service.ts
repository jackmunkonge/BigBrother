import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from '../models/chat';

@Injectable()
export class ChatService {

  constructor(private http: HttpClient) { }

  getChat() {
    return this.http.get<any>('assets/data/chat.json')
      .toPromise()
      .then(res => res.data as Chat)
      .then(data => data);
  }
}
