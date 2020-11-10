type FirebaseError = {
  code: string;
  message: string;
};

export type Error = FirebaseError | string;
