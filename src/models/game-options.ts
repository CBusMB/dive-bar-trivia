import { TriviaCategory } from './trivia-category';
import { DifficultyLevel } from 'src/models/difficulty-level.enum';
import { QuestionType } from 'src/models/question-type.enum';
import { SessionToken } from 'src/models/session-token';

export interface GameOptions {
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  category: TriviaCategory;
  token: SessionToken;
  questionCount: number;
}
