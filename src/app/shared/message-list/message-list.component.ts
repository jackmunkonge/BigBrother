import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent<T> implements OnInit {

  @Input() items: T[];
  @Input() selection: T;
  @Output() change: EventEmitter<T> = new EventEmitter<T>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelection(selection: T) {
    this.change.emit(selection);
  }

}
