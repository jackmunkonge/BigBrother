import { Component, Input, OnInit } from '@angular/core';
import { Chat } from '../../models/chat';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() chat: Chat;
  loading = false;

  constructor() { }

  ngOnInit(): void {
  }
}
