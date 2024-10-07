/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { twMerge } from 'tailwind-merge';

export const FormItem = ({
  children,
  name,
  label,
  rules,
  hidden,
  description,
  readable,
  className,
  hideLabel,
  ...props
}: {
  children: React.ReactNode;
  name: string;
  description?: string | React.ReactNode;
  rules?: RegisterOptions;
  label?: string | React.ReactNode;
  readable?: string;
  hideLabel?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const { control, formState } = useFormContext();
  const value = useWatch({ name });

  const labelIsString = typeof label === 'string';

  return (
    <div
      className={twMerge(
        'flex w-auto flex-col gap-2 dark:text-white',
        hidden ? 'w-0 h-0 overflow-hidden' : '',
        className
      )}
      {...props}
    >
      <Controller
        control={control}
        name={name}
        rules={{
          ...rules,
          required: rules?.required
            ? `O campo ${labelIsString ? label : readable} é obrigatório`
            : undefined,
        }}
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              {hideLabel ? null : (
                <label
                  className="w-full flex flex-col"
                  title={labelIsString ? label : readable}
                >
                  <div className="whitespace-nowrap overflow-hidden overflow-ellipsis w-full flex gap-1">
                    <span className="max-w-fit whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {label}
                    </span>
                    <span className="text-red-600">
                      {rules?.required && label ? ' *' : ''}
                    </span>
                  </div>
                </label>
              )}
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  console.log(child.props.ref?.current);
                  return React.cloneElement(child, {
                    control,
                    ...child.props,
                    ...field,
                    ref: (node: HTMLInputElement) => {
                      console.log(child.props.ref?.current);
                      field.ref(node);
                      child.props.ref?.(node);
                    },
                    onChange: child.props.onChange
                      ? (e: React.ChangeEvent<HTMLInputElement>) => {
                          child.props.onChange(e);
                          field.onChange(e);
                        }
                      : field.onChange,
                    value,
                    name,
                    disabled: formState.disabled || child.props.disabled,
                    className: twMerge(
                      child.props.className,
                      error?.message ? 'border-red-600' : ''
                    ),
                  });
                }
                return child;
              })}
              {description ? (
                <div className="text-neutral-500 text-sm">{description}</div>
              ) : null}

              {error?.message ? (
                <span className="text-sm text-red-600 w-full whitespace-break-spaces">
                  {error?.message as string | undefined}
                </span>
              ) : null}
            </>
          );
        }}
      />
    </div>
  );
};
