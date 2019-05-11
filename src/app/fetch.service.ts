import { HttpClient } from '@angular/common/http';
import { TriviaCategory } from './trivia-category';
import { Observable } from 'rxjs';
import { SessionToken } from './session-token';

const categoriesUrl = 'https://opentdb.com/api_category.php';
const tokenRequestUrl = 'https://opentdb.com/api_token.php?command=request';
export class FetchService {
  constructor(private http: HttpClient) { }

  getCategoryList(): Observable<TriviaCategory[]> {
    return this.http.get<TriviaCategory[]>(categoriesUrl);
  }

  getToken(): Observable<SessionToken> {
    return this.http.get<SessionToken>(tokenRequestUrl);
  }
}
