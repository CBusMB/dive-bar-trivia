import { Component, OnInit } from '@angular/core';
import { GameBuilderService } from 'src/services/game-builder.service';
import { GameQuestion } from 'src/models/game-question';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {
  private countdownMessage = 'READY?';
  private questions: GameQuestion[] = [];
  private currentQuestion: GameQuestion;
  public answerButtonLabels: string[] = [
    'A', 'B', 'C', 'D'
  ];
  public answerResponse = '';
  constructor(private gameBuilder: GameBuilderService) { }

  ngOnInit() {
    this.gameBuilder.currentGameQuestions.subscribe((q) => this.questions = q);
    // this.gameBuilder.buildGame();
    this.countdown();
    this.currentQuestion = this.questions[0];
  }

  countdown() {
    setTimeout(() => {
      this.countdownMessage = 'GO!!';
    }, 1500);
  }

  onAnswerButtonClick(buttonLabel: string) {
    const guessIndex = this.answerButtonLabels.indexOf(buttonLabel);

  }

  userAnswerIsCorrect(guessIndex: number) {
    return this.currentQuestion.correctAnswerIndex === guessIndex;
  }

  setViewForCorrectAnswer() {

  }

  setViewForIncorrectAnswer() {

  }
}
