import { Injectable } from '@angular/core';
import { DifficultyLevel } from 'src/models/difficulty-level.enum';
import { QuestionType } from 'src/models/question-type.enum';

@Injectable({
  providedIn: 'root'
})
export class EnumValueConverterService {
  private levelMap = {
    Easy: DifficultyLevel.Easy,
    Medium: DifficultyLevel.Medium,
    Hard: DifficultyLevel.Hard,
    'Any Level': DifficultyLevel.Any
  };

  private typeMap = {
    'Multiple Choice': QuestionType.MultipleChoice,
    'True / False': QuestionType.TrueFalse,
    All: QuestionType.Both
  };

  constructor() { }
  convertToDifficultyLevel(level: string): DifficultyLevel {
    return this.levelMap[level];
  }

  convertToQuestionType(questionType: string): QuestionType {
    return this.typeMap[questionType];
  }
}
