import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameOptions } from 'src/models/game-options';
import { DifficultyLevel } from 'src/models/difficulty-level.enum';
import { QuestionType } from 'src/models/question-type.enum';
import { TriviaCategoryCollection } from 'src/models/trivia-category-collection';
import { TriviaCategory } from 'src/models/trivia-category';
import { FetchService } from './fetch.service';
import { ApiGeneratorService } from './api-generator.service';
import { TriviaQuestion } from 'src/models/trivia-question';
import { GameResponse } from 'src/models/game-response';
import { GameQuestion } from 'src/models/game-question';

@Injectable({
  providedIn: 'root'
})
export class GameBuilderService {
  private gameOptions: GameOptions = {
    difficulty: DifficultyLevel.Easy,
    questionType: QuestionType.Both,
    category: { id: 9, name: 'General Knowledge' },
    token: { response_code: -1, response_message: '', token: '' },
    questionCount: 10
  };

  private potpourri: TriviaCategory = {
    id: 0,
    name: 'Potpourri (All)'
  };
  triviaQuestions: TriviaQuestion[] = [];
  gameQuestions: GameQuestion[] = [];

  private categories: TriviaCategory[] = [
    this.potpourri,
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

  private gameOptionsSource = new BehaviorSubject<GameOptions>(this.gameOptions);
  currentOptions = this.gameOptionsSource.asObservable();

  private categorySource = new BehaviorSubject<TriviaCategory[]>(this.categories);
  currentCategories = this.categorySource.asObservable();

  private gameQuestionsSource = new BehaviorSubject<GameQuestion[]>(this.gameQuestions);
  currentGameQuestions = this.gameQuestionsSource.asObservable();

  constructor(private fetchService: FetchService, private apiGenerator: ApiGeneratorService) { }
  levels = [
    'Easy',
    'Medium',
    'Hard',
    'Any Level'
  ];

  questionTypes = [
    'Multiple Choice',
    'True / False',
    'All'
  ];

  numberOfQuestions = [
    5,
    10,
    15,
    20
  ];


  changeOptions(options: GameOptions) {
    this.gameOptionsSource.next(options);
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
      if (!this.categories.includes(this.potpourri)) {
        this.categories.push(this.potpourri);
      }
    });
  }

  buildGame() {
    this.currentOptions.subscribe(o => this.gameOptions = o);
    const query = this.apiGenerator.generateApi(this.gameOptions);
    this.fetchService.getGameQuestionsForQuery(query).subscribe((response: GameResponse) => this.triviaQuestions = response.results);
    this.triviaQuestions.forEach((q: TriviaQuestion) => {
      const gq = new GameQuestion(q.category, q.type, q.question, q.difficulty, q.correct_answer, q.incorrect_answers);
      this.gameQuestions.push(gq);
    });
  }
}
