import { SurveyParticipationCondition } from "../enums/survey-participation-condition.enum";

export class UpdateSurveyDto {
  title?: string;
  description?: string;
  isPublic?: boolean;
  participationCondition?: SurveyParticipationCondition;
  forceToRate?: boolean;
  startsAt?: Date;
  endsAt?: Date;

  constructor({
    title,
    description,
    isPublic,
    participationCondition,
    forceToRate,
    startsAt,
    endsAt
  }: {
    title?: string;
    description?: string;
    isPublic?: boolean;
    participationCondition?: SurveyParticipationCondition;
    forceToRate?: boolean;
    startsAt?: Date;
    endsAt?: Date;
  }) {
    this.title = title;
    this.description = description;
    this.isPublic = isPublic;
    this.participationCondition = participationCondition;
    this.forceToRate = forceToRate;
    this.startsAt = startsAt;
    this.endsAt = endsAt;
  }
}
