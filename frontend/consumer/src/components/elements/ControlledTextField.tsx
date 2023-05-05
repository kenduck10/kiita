import { Control, Controller, FieldValues } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FieldPath } from 'react-hook-form/dist/types';

export const ControlledTextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  type,
  label,
  disabled,
}: {
  control: Control<TFieldValues>;
  name: TName;
  type: string;
  label: string;
  disabled?: boolean;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
          disabled={disabled ?? false}
        />
      )}
    />
  );
};
