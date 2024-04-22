import { QueryDto } from "@/api/common/dto/query.dto";
import { IPaginatedResult } from "@/api/common/interfaces/paginated-result.interface";
import { IResponse } from "@/api/common/interfaces/response.interface";
import { ISurveyEntity } from "@/api/surveys/entities/survey.entity";
import { SurveyService } from "@/api/surveys/services/survey.service";
import { renderResponseToast } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Typography } from "@/components/custom/Typography";
import { Survey } from "./Survey";

interface Props {
  className?: string;
}

export const SurveyCollection = (props: Props) => {
  const { className } = props;
  const [surveys, setSurveys]: [ISurveyEntity[], (...args: any[]) => void] =
    useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchSurveys = async (): Promise<void> => {
    const queryDto: QueryDto = new QueryDto({
      elementsPerPage: 6
    });
    const response:
      | IResponse<IPaginatedResult<string, ISurveyEntity>>
      | undefined = await SurveyService.searchSurveys(queryDto);
    renderResponseToast(response, {}, false);
    setSurveys(response?.data?.result ?? []);
  };

  useEffect(() => {
    setIsLoading(true);
    searchSurveys();
    setIsLoading(false);
  }, []);

  return (
    <div className={`${className}`}>
      {isLoading ? (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <Survey key={index} loading={isLoading} />
          ))}
        </>
      ) : (
        <>
          {surveys.map(
            (survey: ISurveyEntity): JSX.Element => (
              <Survey key={survey.id} survey={survey} />
            )
          )}
        </>
      )}
    </div>
  );
};
