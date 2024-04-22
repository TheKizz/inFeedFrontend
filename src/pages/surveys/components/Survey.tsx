import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';

import { ISurveyEntity } from '@/api/surveys/entities/survey.entity';
import { Button } from '@/components/ui/button';
import {
  Axe,
  Earth,
  MailQuestion,
  Play,
  Receipt,
  ReceiptText,
  Slash,
  Star,
  Sunrise,
  Sunset,
} from 'lucide-react';
import { Typography } from '@/components/custom/Typography';
import { useEffect, useState } from 'react';

type SurveyTimeStatus = 'Activo' | 'Expirado' | 'Inactivo';
interface ISurveyStatus {
  state: SurveyTimeStatus;
  color: string;
}

interface Props {
  survey?: ISurveyEntity;
  className?: string;
  loading?: boolean;
}

export const Survey = (props: Props) => {
  const { survey, className, loading } = props;
  const [currentSurveyStatus, setCurrentSurveyStatus] =
    useState<ISurveyStatus>();

  const determineCurrentState = (): ISurveyStatus => {
    if (survey?.endsAt && survey?.endsAt < new Date()) {
      return { state: 'Expirado', color: 'bg-red-500' };
    } else if (survey?.startsAt && survey?.startsAt > new Date()) {
      return { state: 'Inactivo', color: 'bg-blue-500' };
    } else {
      return { state: 'Activo', color: 'bg-green-500' };
    }
  };

  useEffect(() => {
    setCurrentSurveyStatus(determineCurrentState());
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex flex-col space-y-4 max-w-96">
          <Skeleton className="h-4 w-28 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-96" />
            <Skeleton className="h-10 w-96" />
          </div>
          <Skeleton className="h-6 w-96 rounded-md" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-96" />
            <Skeleton className="h-6 w-96" />
          </div>
        </div>
      ) : (
        <div className={`${className}`}>
          <Card
            className="max-w-96 border-black shadow-md duration-300 transition-all hover:shadow-xl "
          >
            <CardHeader className="flex gap-2">
              <div
                className={`flex gap-2 border border-black bg-white rounded-full p-2 items-center w-28 shadow-md duration-300 transition-shadow hover:shadow-inner`}
              >
                <span
                  className={`rounded-full h-3 w-3 ${currentSurveyStatus?.color} ${currentSurveyStatus?.state === 'Activo' ? 'animate-pulse  duration-1000' : ''}`}
                ></span>
                <Typography type="body" variant="small">
                  {currentSurveyStatus?.state}
                </Typography>
              </div>
              <CardTitle className="flex gap-2 line-clamp-2">
                {survey?.title}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {survey?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white border border-black rounded-md flex justify-between shadow-md duration-300 hover:shadow-inner">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size={'icon'}
                        className="duration-300 hover:shadow-inner"
                      >
                        <Sunrise className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Typography type="body" variant="p">
                        Fecha de inicio: {survey?.startsAt}
                      </Typography>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size={'icon'}
                        className="duration-300 hover:shadow-inner"
                      >
                        <MailQuestion className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Typography type="body" variant="p">
                        Pueden participar: {survey?.participationCondition}
                      </Typography>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size={'icon'}
                        className="duration-300 hover:shadow-inner"
                      >
                        <Axe className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Typography type="body" variant="p">
                        Calificación obligatoria:{' '}
                        {survey?.forceToRate ? 'Si' : 'No'}
                      </Typography>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size={'icon'}
                        className="duration-300 hover:shadow-inner"
                      >
                        <Star className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Typography type="body" variant="p">
                        Calificación: {survey?.rating}
                      </Typography>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size={'icon'}
                        className="duration-300 hover:shadow-inner"
                      >
                        <Earth className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Typography type="body" variant="p">
                        Abierto para:{' '}
                        {survey?.isPublic ? 'Todos' : 'Solo invitados'}
                      </Typography>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size={'icon'}
                        className="duration-300 hover:shadow-inner"
                      >
                        <Sunset className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Typography type="body" variant="p">
                        Fecha de cierre:{' '}
                        {survey?.endsAt ? survey?.endsAt : 'Indefinido'}
                      </Typography>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap sm:flex-nowrap gap-2">
              <Button
                variant={'outline'}
                size={'lg'}
                disabled={currentSurveyStatus?.state !== 'Activo'}
                className="w-full min-w-32 border-black shadow-md duration-300 hover:bg-yellow-100 hover:shadow-inner active:bg-yellow-200"
              >
                <Play className="mx-1 size-4" fill="yellow" />
                Participar
              </Button>
              <Button
                variant={'outline'}
                size={'lg'}
                className="min-w-32 border-black w-full shadow-md duration-300 hover:bg-blue-100 hover:shadow-inner active:bg-blue-200"
              >
                <ReceiptText className="mx-1 size-4" fill="skyblue" />
                Detalles
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};
