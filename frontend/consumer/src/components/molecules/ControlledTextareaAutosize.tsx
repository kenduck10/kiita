import { Control, Controller, FieldValues } from 'react-hook-form';
import { TextareaAutosize } from '@mui/material';
import { FieldPath } from 'react-hook-form/dist/types';
import React from 'react';

export const ControlledTextareaAutosize = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  minRows,
  style,
}: {
  control: Control<TFieldValues>;
  name: TName;
  minRows?: number;
  style?: React.CSSProperties;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextareaAutosize {...field} minRows={minRows} style={style}></TextareaAutosize>
      )}
    />
  );
};
