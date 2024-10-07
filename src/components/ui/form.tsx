import React from 'react';
import type { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

export const Form = ({
  children,
  onSubmit,
  form,
  ...props
}: {
  children: React.ReactNode;
  onSubmit: SubmitHandler<any>;
  disabled?: boolean;
  form?: UseFormReturn<any, any, undefined>;
} & Omit<
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >,
  'onSubmit'
>) => {
  const methods = useForm({});

  const formMethods = {
    ...(form ?? methods),
    formState: {
      ...methods.formState,
      disabled: props.disabled || methods.formState.disabled,
    },
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};
