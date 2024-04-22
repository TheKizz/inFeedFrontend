import { Heart } from 'lucide-react';
import { SurveysSection } from './components/SurveysSection';
import { SectionTitle } from '@/components/custom/SectionTitle';

export const HomePage = () => {
  return (
    <div className='animate-slide-in-top'>
      <SectionTitle
        preTitle="Bienvenido de nuevo."
        title="Participa, comunica y crece!"
        icon={<Heart className="size-20" fill="red" />}
      />
      <SurveysSection className='min-h-screen' />
    </div>
  );
};
