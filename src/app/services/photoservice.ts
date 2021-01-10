import { Injectable } from '@angular/core';
import { Image } from '../models/image';
import { DatabaseService } from './database.service';

@Injectable()
export class PhotoService {

    constructor(private dbService: DatabaseService) { }

    getImages() {
    return this.dbService.getDatabase('photos').find({})
      .then(res => res as Image[])
      .then(data => data);
    }
}
