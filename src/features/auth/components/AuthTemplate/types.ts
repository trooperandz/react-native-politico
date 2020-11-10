import { ReactElement, ReactChild } from 'react';

export type AuthTemplateProps = {
  hasLogo?: boolean;
  header?: ReactElement;
  children: ReactChild | ReactChild[];
};
