import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionToken } from '../models/session-token';

@Injectable({
  providedIn: 'root'
})
export class SessionTokenDataService {
  private defaultToken: SessionToken = {
    response_code: -1,
    response_message: '',
    token: ''
  };

  private tokenSource = new BehaviorSubject<SessionToken>(this.defaultToken);
  currentToken = this.tokenSource.asObservable();

  constructor() { }

  changeToken(token: SessionToken) {
    this.tokenSource.next(token);
  }
}
