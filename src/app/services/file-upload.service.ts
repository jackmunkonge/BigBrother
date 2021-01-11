import { Injectable } from '@angular/core';
const app = require('electron').remote.app;
import fs from 'electron-fs-extra';

@Injectable()
export class FileUploadService {

  constructor() { }

  private copyFile(src, dest) {
    return fs.copy(src, dest);
  }

  private deleteFile(path) {
    return fs.remove(path);
  }

  saveAudioFile(path: string, name: string): any {
    return new Promise((resolve, reject) => {
      this.copyFile(path, `${app.getPath("userData")}/audio/${name}`)
        .then(() => {
          resolve({
            path: `${app.getPath("userData")}/audio/${name}`,
            name: name
          });
        })
        .catch(err => {
          reject(err);
        });

    })
  }

  deleteAudioFile(path: string) {
    this.deleteFile(path);
  }
}
