import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gps } from '../models/gps';

@Injectable()
export class GpsService {

  constructor(private http: HttpClient) { }

  getGpsLocations() {
    return this.http.get<any>('assets/data/gps.json')
      .toPromise()
      .then(res => res.data as Gps[])
      .then(data => data);
  }
}
