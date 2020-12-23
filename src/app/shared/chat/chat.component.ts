import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chat } from '../../models/chat';
import { ChatService } from '../../services/chat.service';
import { PhotoService } from '../../demo/service/photoservice';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {

  @Input() chatId: string;
  chat: Chat;
  loading = false;

  constructor(private chatService: ChatService, private photoService: PhotoService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'chatId': {
            this.getChat();
          }
        }
      }
    }
  }

  getChat() {
    this.loading = true;

    this.chatService.getChat()
      .then(data => this.chat = data.find(chat => chat.id === this.chatId))
      .then(() => {
        this.chat.messages
          .sort((a,b) => a.id > b.id ? 1 : -1)
      })
      .then(() => this.loading = false);
  }
}
