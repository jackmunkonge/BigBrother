import { Component, OnInit } from '@angular/core';
import { Chat } from '../../models/chat';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chat: Chat;
  loading = true;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getChat()
      .then(data => this.chat = data)
      .then(() => {
        this.chat.messages
          .sort((a,b) => a.id > b.id ? 1 : -1)
      })
      .then(() => this.loading = false);
  }

}
