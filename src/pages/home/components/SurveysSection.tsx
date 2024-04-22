import { Typography } from '@/components/custom/Typography';
import { Button } from '@/components/ui/button';
import { SurveyCollection } from '@/pages/surveys/components/SurveyCollection';
import { ArrowUpRight, Book, BookOpenCheckIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  className?: string;
}

export const SurveysSection = (props?: Props) => {
  const { className } = props ?? {};
  return (
    <section
      className={`${className} flex flex-col bg-white gap-10 border border-black rounded-lg p-5 py-10 border-dashed shadow-lg`}
    >
      <div className="flex gap-2 mx-auto sm:items-start md:items-center self-start">
        <Book className="size-9" />
        <span>
          <Typography type="title" variant="h2">
            Encuestas{' '}
          </Typography>
          <Typography type="body" variant="muted">
            Las encuestas más recientes,
            <Link to="/surveys" className="text-blue-500 font-semibold">
              observarlas todas.
            </Link>
          </Typography>
        </span>
      </div>
      <SurveyCollection className="flex flex-wrap gap-8 justify-center animate-fade-in" />
    </section>
  );
};
