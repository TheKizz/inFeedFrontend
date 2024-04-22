import { ReactNode } from "react";
import { Typography } from "./Typography";

interface Props {
  icon?: ReactNode;
  preTitle?: string;
  title?: string;
  className?: string;
  children?: ReactNode;
}

export const SectionTitle = (props: Props) => {
  const { icon, preTitle, title, className, children } = props;
  return (
    <div
      className={`${className} h-60 flex items-center gap-4 hover:animate-bouncing`}
    >
      {icon}
      <span>
        <Typography type="title" variant="h2">
          {preTitle}
        </Typography>
        <Typography type="title" variant="h1" className="leading-normal">
          {title}
        </Typography>
      </span>
      {children}
    </div>
  );
};
