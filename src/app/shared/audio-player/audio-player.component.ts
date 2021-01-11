import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Track } from 'ngx-audio-player';
const app = require('electron').remote.app;
const fs = require('electron').remote.require('fs');

@Component({
  selector: 'audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, OnChanges {

  @Input() link: string;
  playlist: Track[] = [{
    title: '',
    link: ''
  }];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    for(const propName in changes) {
      switch (propName) {
        case 'link':
          console.log('Original Link: ', this.link);
          this.playlist[0].link = this.convertAudioLink(this.link);
          console.log('Converted Link: ', this.playlist[0].link);
          break;
      }
    }
  }

  convertAudioLink(link: string) {
    let newLink = `${app.getPath("userData")}/${link}`;
    if (fs.existsSync(newLink)) {
      console.log('File exists')
    } else {
      console.log('File does not exist')
      newLink = '';
    }
    return newLink;
  }

}
