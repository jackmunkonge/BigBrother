import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Call } from '../models/call';

@Injectable()
export class CallService {

  constructor(private http: HttpClient) { }

  getCalls() {
    return this.http.get<any>('assets/data/calls.json')
      .toPromise()
      .then(res => res.data as Call[])
      .then(data => data);
  }
}
