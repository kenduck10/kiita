import { Control, Controller, FieldValues } from 'react-hook-form';
import { SxProps, TextField, Theme } from '@mui/material';
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
  sx,
  fullWidth,
  id,
}: {
  control: Control<TFieldValues>;
  name: TName;
  type: string;
  label?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
  id?: string;
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
          sx={sx}
          fullWidth={fullWidth ?? false}
          id={id}
        />
      )}
    />
  );
};
