import { QuestionType } from "../enums/question-type.enum";

export class UpdateQuestionDto {
  description?: string;
  type?: QuestionType;

  constructor({
    description,
    type
  }: {
    description?: string;
    type?: QuestionType;
  }) {
    this.description = description;
    this.type = type;
  }
}
