import { useState, useEffect } from 'react';

export const useForm = (
  callback: () => void,
  defaultFormValues: { [key: string]: string },
  validate: Function,
) => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [formErrors, setFormErrors] = useState<{
    [key: string]: string | undefined;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!Object.keys(formErrors).length && isSubmitting) {
      callback();
      setIsSubmitting(false);
    }
  }, [callback, formErrors, isSubmitting]);

  const handleChange = (type: string, text: string) => {
    setFormValues((values: { [key: string]: string }) => ({
      ...values,
      [type]: text,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setFormErrors(validate(formValues));
  };

  return {
    handleChange,
    handleSubmit,
    formValues,
    formErrors,
    isSubmitting,
  };
};
