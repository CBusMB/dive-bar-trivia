import { Component, OnInit } from '@angular/core';
import { TriviaCategory } from '../../models/trivia-category';
import { GameBuilderService } from '../../services/game-builder.service';
import { GameOptions } from 'src/models/game-options';

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
    'Hard'
  ];
  questionTypes = [
    'Multiple Choice',
    'True / False'
  ];

  constructor(private gameBuilder: GameBuilderService) { }

  ngOnInit() {
    this.gameBuilder.currentOptions.subscribe(game => this.gameOptions = game);
    this.gameBuilder.currentCategories.subscribe((cat) => {
      this.categories = cat.trivia_categories;
      console.log(cat);
    });
  }

  updateOptions() {
    this.gameBuilder.changeOptions(this.gameOptions);
  }
}
