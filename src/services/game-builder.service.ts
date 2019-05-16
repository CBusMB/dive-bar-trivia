import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameOptions } from 'src/models/game-options';
import { DifficultyLevel } from 'src/models/difficulty-level.enum';
import { QuestionType } from 'src/models/question-type.enum';
import { TriviaCategoryCollection } from 'src/models/trivia-category-collection';
import { TriviaCategory } from 'src/models/trivia-category';
import { FetchService } from './fetch.service';

@Injectable({
  providedIn: 'root'
})
export class GameBuilderService {
  private defaultOptions: GameOptions = {
    difficulty: DifficultyLevel.Easy,
    questionType: QuestionType.Both,
    category: { id: 9, name: 'General Knowledge' },
    token: { response_code: -1, response_message: '', token: '' },
    questionCount: 10
  };

  private categories: TriviaCategory[] = [
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

  private potpourri: TriviaCategory = {
    id: 0,
    name: 'Potpourri (All)'
  };

  private gameSource = new BehaviorSubject<GameOptions>(this.defaultOptions);
  currentOptions = this.gameSource.asObservable();

  private categorySource = new BehaviorSubject<TriviaCategory[]>(this.categories);
  currentCategories = this.categorySource.asObservable();

  constructor(private fetchService: FetchService) { }

  changeOptions(options: GameOptions) {
    this.gameSource.next(options);
  }

  updateCategories(categories: TriviaCategory[]) {
    if (!categories.includes(this.potpourri)) {
      categories.push(this.potpourri);
    }
    this.categorySource.next(categories);
  }

  fetchCategories() {
    const categoryKey = 'trivia_categories';
    this.fetchService.getCategoryList().subscribe((data: TriviaCategoryCollection) => {
      this.categories = data[categoryKey];
    });
    // this.gameBuilder.updateCategories({ trivia_categories: this.categories });
  }
}
