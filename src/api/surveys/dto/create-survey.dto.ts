import { SurveyParticipationCondition } from '../enums/survey-participation-condition.enum';
import { CreateQuestionDto } from './create-question.dto';

export class CreateSurveyDto {
  title: string;
  description: string;
  isPublic: boolean;
  participationCondition: SurveyParticipationCondition;
  forceToRate: boolean;
  startsAt: Date;
  endsAt?: Date;
  questions?: CreateQuestionDto[];

  constructor({
    title,
    description,
    isPublic,
    participationCondition,
    forceToRate,
    startsAt,
    endsAt,
    questions,
  }: {
    title: string;
    description: string;
    isPublic: boolean;
    participationCondition: SurveyParticipationCondition;
    forceToRate: boolean;
    startsAt: Date;
    endsAt?: Date;
    questions?: CreateQuestionDto[];
  }) {
    this.title = title;
    this.description = description;
    this.isPublic = isPublic;
    this.participationCondition = participationCondition;
    this.forceToRate = forceToRate;
    this.startsAt = startsAt;
    this.endsAt = endsAt;
    this.questions = questions;
  }
}
