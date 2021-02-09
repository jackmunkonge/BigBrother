import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import { TextMessagesService } from '../../services/text-messages.service';
import { TextMessage } from '../../models/text-message';
import { SelectItem } from 'primeng/api';


@Component({
  templateUrl: './text-messages.component.html',
  styleUrls: ['./text-messages.component.scss']
})
export class TextMessagesComponent implements OnInit {

  loading = true;

  items: SelectItem<TextMessage>[];
  textMessages: TextMessage[];
  initialSelection: TextMessage;
  selected: TextMessage;

  constructor(private textMessagesService: TextMessagesService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Text Messages'}
    ]);
  }

  ngOnInit() {
    this.textMessagesService.getTextMessages()
      .then(data => this.textMessages = data)
      .then(data => this.items = this.getTextSelectItems(data)
        .sort((a,b) => {
          if (b.value.chat.messages[0].date && b.value.chat.messages[0].date){
            return b.value.chat.messages[0].date.getTime() - a.value.chat.messages[0].date.getTime() ? 1 : -1;
          }
          return 1;
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
