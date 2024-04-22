export class UpdateAnswerOptionDto {
  description?: string;

  constructor({ description }: { description?: string }) {
    this.description = description;
  }
}
