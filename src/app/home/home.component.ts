import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/services/fetch.service';
import { TriviaCategory } from 'src/models/trivia-category';
import { TriviaCategoryCollection } from 'src/models/trivia-category-collection';
import { SessionToken } from 'src/models/session-token';
import { SessionTokenDataService } from 'src/services/session-token-data.service';
import { GameBuilderService } from 'src/services/game-builder.service';
import { GameOptions } from 'src/models/game-options';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private fetchService: FetchService,
    // tslint:disable-next-line: align
    private tokenService: SessionTokenDataService,
    // tslint:disable-next-line: align
    private gameBuilder: GameBuilderService) { }

  categories: TriviaCategory[] = [
    { id: 9, name: 'General Knowledge' },
    { id: 10, name: 'Entertainment: Books' },
    { id: 11, name: 'Entertainment: Film' },
    { id: 12, name: 'Entertainment: Music' },
    { id: 13, name: 'Entertainment: Musicals & Theatres' },
    { id: 14, name: 'Entertainment: Television' },
    { id: 15, name: 'Entertainment: Video Games' },
    { id: 16, name: 'Entertainment: Board Games' },
    { id: 17, name: 'Science & Nature' },
    { id: 18, name: 'Science: Computers' },
    { id: 19, name: 'Science: Mathematics' },
    { id: 20, name: 'Mythology' },
    { id: 21, name: 'Sports' },
    { id: 22, name: 'Geography' },
    { id: 23, name: 'History' },
    { id: 24, name: 'Politics' },
    { id: 25, name: 'Art' },
    { id: 26, name: 'Celebrities' },
    { id: 27, name: 'Animals' },
    { id: 28, name: 'Vehicles' },
    { id: 29, name: 'Entertainment: Comics' },
    { id: 30, name: 'Science: Gadgets' },
    { id: 31, name: 'Entertainment: Japanese Anime & Manga' },
    { id: 32, name: 'Entertainment: Cartoon & Animations' }
  ];
  token: SessionToken = {
    response_code: -1,
    response_message: '',
    token: ''
  };
  gameOptions: GameOptions;
  ngOnInit() {
    this.tokenService.currentToken.subscribe(updatedToken => this.token = updatedToken);
    this.gameBuilder.currentOptions.subscribe(updatedOptions => this.gameOptions = updatedOptions);
    this.gameBuilder.updateCategories({ trivia_categories: this.categories });
    // this.fetchCategories();
  }

  fetchCategories() {
    const categoryKey = 'trivia_categories';
    this.fetchService.getCategoryList().subscribe((data: TriviaCategoryCollection) => {
      const collection: TriviaCategory[] = data[categoryKey];
      collection.forEach(d => {
        this.categories.push(d);
      });
    });
    // this.gameBuilder.updateCategories({ trivia_categories: this.categories });
  }

  requestToken() {
    const tokenKey = 'token';
    this.fetchService.getToken().subscribe((t: SessionToken) => {
      this.token = t;
    });
  }

  onCategoryClick(category: TriviaCategory) {
    if (this.token.response_code === -1) {
      this.requestToken();
      this.tokenService.changeToken(this.token);
    }
    this.gameOptions.category = category;
    this.gameOptions.token = this.token;
    this.gameBuilder.changeOptions(this.gameOptions);
  }
}
