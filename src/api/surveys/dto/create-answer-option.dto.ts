export class CreateAnswerOptionDto {
  questionId: string;
  description: string;

  constructor({
    questionId,
    description,
  }: {
    questionId: string;
    description: string;
  }) {
    this.questionId = questionId;
    this.description = description;
  }
}
