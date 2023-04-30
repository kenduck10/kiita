import { Control, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export const ControlledTextField = ({
  control,
  name,
  type,
  label,
}: {
  control: Control<any>;
  name: string;
  type: string;
  label: string;
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
        />
      )}
    />
  );
};
