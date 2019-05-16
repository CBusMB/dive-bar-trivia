import { Component, OnInit } from '@angular/core';
import { TriviaCategory } from '../../models/trivia-category';
import { GameBuilderService } from '../../services/game-builder.service';
import { GameOptions } from 'src/models/game-options';
import { EnumValueConverterService } from 'src/services/enum-value-converter.service';
import { FetchService } from 'src/services/fetch.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  categories: TriviaCategory[] = [];
  gameOptions: GameOptions;
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

  constructor(private gameBuilder: GameBuilderService, private converter: EnumValueConverterService, private fetchService: FetchService) { }

  ngOnInit() {
    this.gameBuilder.currentOptions.subscribe(game => this.gameOptions = game);
    this.gameBuilder.currentCategories.subscribe((cat) => {
      this.categories = cat;
    });
    if (this.categories.length < 1) {
      this.fetchService.getCategoryList();
    }
  }

  updateOptions() {
    this.gameBuilder.changeOptions(this.gameOptions);
  }

  onCategorySelected(category: TriviaCategory) {
    this.gameOptions.category = category;
  }

  onQuestionCountSelected(questionCount: number) {
    this.gameOptions.questionCount = questionCount;
  }

  onLevelSelected(level: string) {
    this.gameOptions.difficulty = this.converter.convertToDifficultyLevel(level);
  }

  onQuestionTypeSelected(type: string) {
    this.gameOptions.questionType = this.converter.convertToQuestionType(type);
  }

  onStartButtonClick() {
    setTimeout(() => this.updateOptions(), 300);
  }
}
