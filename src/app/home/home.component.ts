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

  categories: TriviaCategory[] = [];
  token: SessionToken = {
    response_code: -1,
    response_message: '',
    token: ''
  };
  gameOptions: GameOptions;
  ngOnInit() {
    this.tokenService.currentToken.subscribe(updatedToken => this.token = updatedToken);
    this.gameBuilder.currentOptions.subscribe(updatedOptions => this.gameOptions = updatedOptions);
    this.gameBuilder.currentCategories.subscribe(updatedCategories => this.categories = updatedCategories);
    this.gameBuilder.updateCategories(this.categories);
    // this.gameBuilder.fetchCategories();
  }

  requestToken() {
    const tokenKey = 'token';
    this.fetchService.getToken().subscribe((t: SessionToken) => {
      this.token = t;
    });
  }

  onCategoryClick(category: TriviaCategory) {
    if (this.token.response_code === -1) {
      // this.requestToken();
      this.tokenService.changeToken(this.token);
    }
    this.gameOptions.category = category;
    this.gameOptions.token = this.token;
    this.gameBuilder.changeOptions(this.gameOptions);
  }
}
