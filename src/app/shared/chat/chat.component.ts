import { Component, Input } from '@angular/core';
import { Chat } from '../../models/chat';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @Input() chat: Chat;
  @Input() participant: string;

  constructor() { }
}
