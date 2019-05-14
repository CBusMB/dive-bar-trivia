import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameOptions } from 'src/models/game-options';
import { DifficultyLevel } from 'src/models/difficulty-level.enum';
import { QuestionType } from 'src/models/question-type.enum';
import { TriviaCategoryCollection } from 'src/models/trivia-category-collection';
import { TriviaCategory } from 'src/models/trivia-category';

@Injectable({
  providedIn: 'root'
})
export class GameBuilderService {
  defaultOptions: GameOptions = {
    difficulty: DifficultyLevel.Easy,
    questionType: QuestionType.MultipleChoice,
    category: { id: 9, name: 'General Knowledge' },
    token: { response_code: -1, response_message: '', token: '' },
    questionCount: 10
  };
  categories: TriviaCategoryCollection = {
    trivia_categories: []
  };

  private gameSource = new BehaviorSubject<GameOptions>(this.defaultOptions);
  currentOptions = this.gameSource.asObservable();

  private categorySource = new BehaviorSubject<TriviaCategoryCollection>(this.categories);
  currentCategories = this.categorySource.asObservable();

  constructor() { }

  changeOptions(options: GameOptions) {
    this.gameSource.next(options);
  }

  updateCategories(categories: TriviaCategoryCollection) {
    console.log(categories);
    this.categorySource.next(categories);
  }
}
