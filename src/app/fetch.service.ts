import { HttpClient } from '@angular/common/http';
import { TriviaCategory } from './trivia-category';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SessionToken } from './session-token';
import { TriviaCategoryCollection } from './trivia-category-collection';

const categoriesUrl = 'https://opentdb.com/api_category.php';
const tokenRequestUrl = 'https://opentdb.com/api_token.php?command=request';
@Injectable()
export class FetchService {
  constructor(private http: HttpClient) { }

  getCategoryList(): Observable<TriviaCategoryCollection> {
    return this.http.get<TriviaCategoryCollection>(categoriesUrl);
  }

  getToken(): Observable<SessionToken> {
    return this.http.get<SessionToken>(tokenRequestUrl);
  }
}
