import { Injectable } from '@angular/core';
import { GameOptions } from 'src/models/game-options';
import { DifficultyLevel } from 'src/models/difficulty-level.enum';
import { QuestionType } from 'src/models/question-type.enum';
import { ApiParameters } from 'src/models/api-parameters';

@Injectable({
  providedIn: 'root'
})
export class ApiGeneratorService {
  private urlBase = 'https://opentdb.com/api.php?';
  private amountParam = 'amount';
  private categoryParam = 'category';
  private difficultyParam = 'difficulty';
  private typeParam = 'type';
  private tokenParam = 'token';
  constructor() { }

  generateApi(gameOptions: GameOptions): string {
    const amount = gameOptions.questionCount;
    const parameters: ApiParameters = {};
    parameters.amount = amount;
    if (this.categoryIsPotpourri(gameOptions)) {
      parameters.category = gameOptions.category.id;
    }
    if (this.questionTypeIsSpecified(gameOptions)) {
      parameters.type = gameOptions.questionType;
    }
    if (this.difficultyLevelIsSpecified(gameOptions)) {
      parameters.difficulty = gameOptions.difficulty;
    }
    if (this.hasToken(gameOptions)) {
      parameters.token = gameOptions.token.token;
    }
    const queryString = Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');
    return `${this.urlBase}${queryString}`;
  }

  private difficultyLevelIsSpecified(gameOptions: GameOptions): boolean {
    return gameOptions.difficulty !== DifficultyLevel.Any;
  }

  private questionTypeIsSpecified(gameOptions: GameOptions): boolean {
    return gameOptions.questionType !== QuestionType.Both;
  }

  private hasToken(gameOptions: GameOptions): boolean {
    return gameOptions.token.token.length > 0;
  }

  private categoryIsPotpourri(gameOptions: GameOptions): boolean {
    return gameOptions.category.id === 0;
  }


}
