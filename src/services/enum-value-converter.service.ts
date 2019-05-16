import { Injectable } from '@angular/core';
import { DifficultyLevel } from 'src/models/difficulty-level.enum';
import { QuestionType } from 'src/models/question-type.enum';

@Injectable({
  providedIn: 'root'
})
export class EnumValueConverterService {

  constructor() { }
  convertToDifficultyLevel(level: string): DifficultyLevel {
    if (level === DifficultyLevel.Easy) {
      return DifficultyLevel.Easy;
    } else if (level === DifficultyLevel.Medium) {
      return DifficultyLevel.Medium;
    } else {
      return DifficultyLevel.Hard;
    }
  }

  convertToQuestionType(questionType: string): QuestionType {
    if (questionType === QuestionType.TrueFalse) {
      return QuestionType.TrueFalse;
    } else if (questionType === QuestionType.MultipleChoice) {
      return QuestionType.MultipleChoice;
    } else {
      return QuestionType.Both;
    }
  }
}
