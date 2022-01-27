import { ReactNode } from 'react';

type Props = {
  href: string;
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
};

export const ExternalLink = ({
  href,
  ariaLabel,
  className,
  children,
}: Props) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      {...{ href, className }}
    >
      {children}
    </a>
  );
};
