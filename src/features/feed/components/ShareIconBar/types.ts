export type ShareIconBarProps = {
  emailUrl: string | null;
  phoneNumber: string | null;
  twitterSlug: string | null;
  facebookSlug: string | null;
  shareUri: string | null;
  style?: {
    [key: string]: string | number;
  };
};
