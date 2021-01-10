import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Profile } from '../models/profile';

@Injectable()
export class ProfileService {

  constructor(private dbService: DatabaseService) { }

  getProfile() {
    return this.dbService.getDatabase('profile').findOne({id: '1'})
      .then(res => res as Profile)
      .then(data => data);
  }
}
