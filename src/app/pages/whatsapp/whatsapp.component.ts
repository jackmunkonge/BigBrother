import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import { SelectItem } from 'primeng/api';
import { TextMessage } from '../../models/text-message';
import { TextMessagesService } from '../../services/text-messages.service';

@Component({
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsAppComponent implements OnInit {

  loading = true;

  items: SelectItem<TextMessage>[];
  textMessages: TextMessage[];
  initialSelection: TextMessage;
  selected: TextMessage;

  constructor(private textMessagesService: TextMessagesService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'WhatsApp'}
    ]);
  }

  ngOnInit() {
    this.textMessagesService.getTextMessages()
      .then(data => this.textMessages = data)
      .then(data => this.items = this.getTextSelectItems(data))
      .then(() => {
        this.loading = false;
        this.initialSelection = this.items[0].value;
      });
  }

  private getTextSelectItems(textMessages: TextMessage[]): SelectItem<TextMessage>[] {
    return textMessages.sort((a,b) => (a.id > b.id) ? 1 : -1).map(text => {
      return {
        title: text.name,
        value: text
      }
    });
  }

  onChange(chat: TextMessage) {
    this.selected = chat;
  }
}
