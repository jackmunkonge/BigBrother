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
  selection: TextMessage;

  constructor(private textMessagesService: TextMessagesService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      {label: 'Text Messages'}
    ]);
  }

  ngOnInit() {
    this.textMessagesService.getTextMessages()
      .then(data => this.textMessages = data)
      .then(data => this.items = this.getTextSelectItems(data))
      .then(() => {
        this.loading = false;
        this.selection = this.items[0].value;
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

  onChange(chat: SelectItem<TextMessage>) {
    console.log(chat);
  }
}