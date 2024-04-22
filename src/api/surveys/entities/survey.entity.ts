import { IEntity } from "@/api/common/interfaces/entity.interface";
import { SurveyParticipationCondition } from "../enums/survey-participation-condition.enum";
import { IQuestionEntity } from "./question.model";

export interface ISurveyEntity extends IEntity<string> {
  title: string;
  description: string;
  isPublic: boolean;
  participationCondition: SurveyParticipationCondition;
  forceToRate: boolean;
  rating: number;
  startsAt: Date;
  endsAt?: Date;
  creatorId: string;
  questions?: IQuestionEntity[];
}
