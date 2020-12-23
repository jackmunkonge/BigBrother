import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { App } from '../models/app';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  getApps() {
    return this.http.get<any>('assets/data/apps.json')
      .toPromise()
      .then(res => res.data as App[])
      .then(data => data);
  }
}
