import { QueryDto } from "@/api/common/dto/query.dto";
import { IPaginatedResult } from "@/api/common/interfaces/paginated-result.interface";
import { ISurveyEntity } from "../entities/survey.entity";
import { IResponse } from "@/api/common/interfaces/response.interface";
import { buildQueryParams } from "@/api/common/utils/utils";
import { USER_ACCESS_TOKEN_KEY } from "@/contexts/auth.context";
import { CreateSurveyDto } from "../dto/create-survey.dto";
import { UpdateSurveyDto } from "../dto/update-survey.dto";
import { CreateQuestionDto } from "../dto/create-question.dto";
import { UpdateQuestionDto } from "../dto/update-question.dto";
import { IQuestionEntity } from "../entities/question.model";
import { IAnswerOptionEntity } from "../entities/answer-option.model";
import { CreateAnswerOptionDto } from "../dto/create-answer-option.dto";
import { UpdateAnswerOptionDto } from "../dto/update-answer.dto";

export class SurveyService {
  private static readonly baseUrl = `${import.meta.env.VITE_APP_API_URL}/surveys`;

  // Survey
  static async searchSurveys(
    queryDto: QueryDto<string>
  ): Promise<IResponse<IPaginatedResult<string, ISurveyEntity>> | undefined> {
    try {
      const response = await fetch(
        `${this.baseUrl}?${buildQueryParams(queryDto)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN_KEY)}`
          }
        }
      );
      if (response.status >= 500) {
        throw new Error(response.statusText);
      }
      return (await response.json()) as IResponse<
        IPaginatedResult<string, ISurveyEntity>
      >;
    } catch (error) {
      console.error(error);
    }
  }

  static async findSurveyById(
    surveyId: string
  ): Promise<IResponse<ISurveyEntity> | undefined> {
    try {
      const response = await fetch(`${this.baseUrl}/${surveyId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN_KEY)}`
        }
      });
      if (response.status >= 500) {
        throw new Error(response.statusText);
      }
      return (await response.json()) as IResponse<ISurveyEntity>;
    } catch (error) {
      console.error(error);
    }
  }

  static async createSurvey(
    createSurveyDto: CreateSurveyDto
  ): Promise<IResponse<ISurveyEntity> | undefined> {
    try {
      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN_KEY)}`
        },
        body: JSON.stringify(createSurveyDto)
      });
      if (response.status >= 500) {
        throw new Error(response.statusText);
      }
      return (await response.json()) as IResponse<ISurveyEntity>;
    } catch (error) {
      console.error(error);
    }
  }

  static async updateSurveyById(
    surveyId: string,
    updateSurveyDto: UpdateSurveyDto
  ): Promise<IResponse<ISurveyEntity> | undefined> {
    try {
      const response = await fetch(`${this.baseUrl}/${surveyId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN_KEY)}`
        },
        body: JSON.stringify(updateSurveyDto)
      });
      if (response.status >= 500) {
        throw new Error(response.statusText);
      }
      return (await response.json()) as IResponse<ISurveyEntity>;
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteSurveyById(
    surveyId: string
  ): Promise<IResponse<ISurveyEntity> | undefined> {
    try {
      const response = await fetch(`${this.baseUrl}/${surveyId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN_KEY)}`
        }
      });
      if (response.status >= 500) {
        throw new Error(response.statusText);
      }
      return (await response.json()) as IResponse<ISurveyEntity>;
    } catch (error) {
      console.error(error);
    }
  }

  // Question
  static async createQuestion(
    surveyId: string,
    createQuestionDto: CreateQuestionDto
  ): Promise<IResponse<IQuestionEntity> | undefined> {
    try {
      const response = await fetch(`${this.baseUrl}/${surveyId}/questions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN_KEY)}`
        },
        body: JSON.stringify(createQuestionDto)
      });
      if (response.status >= 500) {
        throw new Error(response.statusText);
      }
      return (await response.json()) as IResponse<IQuestionEntity>;
    } catch (error) {
      console.error(error);
    }
  }

  static async updateQuestionById(
    surveyId: string,
    questionId: string,
    updateQuestionDto: UpdateQuestionDto
  ): Promise<IResponse<IQuestionEntity> | undefined> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${surveyId}/questions/${questionId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN_KEY)}`
          },
          body: JSON.stringify(updateQuestionDto)
        }
      );
      if (response.status >= 500) {
        throw new Error(response.statusText);
      }
      return (await response.json()) as IResponse<IQuestionEntity>;
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteQuestionById(
    surveyId: string,
    questionId: string
  ): Promise<IResponse<IQuestionEntity> | undefined> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${surveyId}/questions/${questionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN_KEY)}`
          }
        }
      );
      if (response.status >= 500) {
        throw new Error(response.statusText);
      }
      return (await response.json()) as IResponse<IQuestionEntity>;
    } catch (error) {
      console.error(error);
    }
  }

  // Answer
  static async createAnswerOption(
    surveyId: string,
    questionId: string,
    createAnswerOptionDto: CreateAnswerOptionDto
  ): Promise<IResponse<IAnswerOptionEntity> | undefined> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${surveyId}/questions/${questionId}/answer-options`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN_KEY)}`
          },
          body: JSON.stringify(createAnswerOptionDto)
        }
      );
      if (response.status >= 500) {
        throw new Error(response.statusText);
      }
      return (await response.json()) as IResponse<IAnswerOptionEntity>;
    } catch (error) {
      console.error(error);
    }
  }

  static async updateAnswerOptionById(
    surveyId: string,
    questionId: string,
    answerOptionId: string,
    updateAnswerOptionDto: UpdateAnswerOptionDto
  ): Promise<IResponse<IAnswerOptionEntity> | undefined> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${surveyId}/questions/${questionId}/answer-options/${answerOptionId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN_KEY)}`
          },
          body: JSON.stringify(updateAnswerOptionDto)
        }
      );
      if (response.status >= 500) {
        throw new Error(response.statusText);
      }
      return (await response.json()) as IResponse<IAnswerOptionEntity>;
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteAnswerOptionById(
    surveyId: string,
    questionId: string,
    answerOptionId: string
  ): Promise<IResponse<IAnswerOptionEntity> | undefined> {
    try {
      const response = await fetch(
        `${this.baseUrl}/${surveyId}/questions/${questionId}/answer-options/${answerOptionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(USER_ACCESS_TOKEN_KEY)}`
          }
        }
      );
      if (response.status >= 500) {
        throw new Error(response.statusText);
      }
      return (await response.json()) as IResponse<IAnswerOptionEntity>;
    } catch (error) {
      console.error(error);
    }
  }
}
