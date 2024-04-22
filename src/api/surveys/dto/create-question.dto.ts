import { QuestionType } from "../enums/question-type.enum";
import { CreateAnswerOptionDto } from "./create-answer-option.dto";

export class CreateQuestionDto {
  surveyId: string;
  description: string;
  type: QuestionType;
  answerOptions?: CreateAnswerOptionDto[];

  constructor({
    surveyId,
    description,
    type,
    answerOptions
  }: {
    surveyId: string;
    description: string;
    type: QuestionType;
    answerOptions?: CreateAnswerOptionDto[];
  }) {
    this.surveyId = surveyId;
    this.description = description;
    this.type = type;
    this.answerOptions = answerOptions;
  }
}
