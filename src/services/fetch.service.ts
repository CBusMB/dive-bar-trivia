import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SessionToken } from '../models/session-token';
import { TriviaCategoryCollection } from 'src/models/trivia-category-collection';
import { GameResponse } from 'src/models/game-response';

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

  getGameQuestionsForQuery(query: string): Observable<GameResponse> {
    return this.http.get<GameResponse>(query);
  }
}
