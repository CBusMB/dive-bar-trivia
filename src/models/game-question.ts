export class GameQuestion {
  private category: string;
  private questionType: string;
  private question: string;
  private difficulty: string;
  private correctAnswer: string;
  private incorrectAnswers: string[] = [];
  private allAnswers: string[] = [];
  public correctAnswerIndex: number;
  private trueFalseButtonMap = {
    0: 'A',
    1: 'B'
  };
  private multipleChoiceButtonMap = {
    0: this.trueFalseButtonMap[0],
    1: this.trueFalseButtonMap[1],
    2: 'C',
    3: 'D'
  };

  constructor(category: string,
    // tslint:disable-next-line: align
    questionType: string,
    // tslint:disable-next-line: align
    question: string,
    // tslint:disable-next-line: align
    difficulty: string,
    // tslint:disable-next-line: align
    correctAnswer: string,
    // tslint:disable-next-line: align
    incorrectAnswers: string[]) {
    this.category = category;
    this.questionType = questionType;
    this.question = question;
    this.difficulty = difficulty;
    this.correctAnswer = correctAnswer;
    this.incorrectAnswers = incorrectAnswers;
    this.initializeAnswerSet();
  }

  initializeAnswerSet() {
    this.setFullAnswers();
    this.shuffleAnswers();
    this.setCorrectAnswerIndex();
  }

  setFullAnswers() {
    this.allAnswers = this.incorrectAnswers;
    this.allAnswers.push(this.correctAnswer);
  }

  shuffleAnswers() {
    let currentIndex = this.allAnswers.length;
    let temporaryAnswer: string;
    let randomIndex: number;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryAnswer = this.allAnswers[currentIndex];
      this.allAnswers[currentIndex] = this.allAnswers[randomIndex];
      this.allAnswers[randomIndex] = temporaryAnswer;
    }
  }

  setCorrectAnswerIndex() {
    this.correctAnswerIndex = this.allAnswers.indexOf(this.correctAnswer);
  }

  getQuestion(): string {
    return this.question;
  }

  getCategory(): string {
    return this.category;
  }

  getDifficult(): string {
    return this.firstCharToUpper(this.difficulty);
  }

  firstCharToUpper(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
