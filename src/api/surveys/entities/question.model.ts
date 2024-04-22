import { QuestionType } from "../enums/question-type.enum";
import { IAnswerOptionEntity } from "./answer-option.model";

export interface IQuestionEntity {
  id: string;
  surveyId: string;
  description: string;
  type: QuestionType;
  answerOptions?: IAnswerOptionEntity[];
}