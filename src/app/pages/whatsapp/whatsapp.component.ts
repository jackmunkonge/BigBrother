import { Component, OnInit } from '@angular/core';
import { TextMessagesService } from '../../services/text-messages.service';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import { SelectItem } from 'primeng/api';
import { TextMessage } from '../../models/text-message';

@Component({
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {

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
    this.textMessagesService.getWhatsAppMessages()
      .then(data => this.textMessages = data)
      .then(data => this.items = this.getTextSelectItems(data)
        .sort((a,b) => {
          return b.value.chat.messages[0].date.getTime() - a.value.chat.messages[0].date.getTime();
        })
      )
      .then(() => {
        this.loading = false;
        this.initialSelection = this.items[0].value;
      });
  }

  private getTextSelectItems(textMessages: TextMessage[]): SelectItem<TextMessage>[] {
    return textMessages.map(text => {
      return {
        title: text.name,
        value: text
      }
    });
  }

  onChange(textMessage: TextMessage) {
    this.selected = textMessage;
  }

}
