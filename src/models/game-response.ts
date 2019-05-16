import { TriviaQuestion } from './trivia-question';

export interface GameResponse {
  response_code: number;
  results: TriviaQuestion[];
}
