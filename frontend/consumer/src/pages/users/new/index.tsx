import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';

type SubmitDataArgument = {
  lastName: string;
  firstName: string;
};

const errorScheme = yup.object().shape({
  lastName: yup.string().required('姓の入力は必須です').max(50, '姓は50文字以内で入力してください'),
  firstName: yup.string().required('名の入力は必須です').max(50, '名は50文字以内で入力してください'),
});
export default () => {
  const { control, handleSubmit } = useForm<SubmitDataArgument>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      lastName: '',
      firstName: '',
    },
    resolver: yupResolver(errorScheme),
  });
  const onSubmit: SubmitHandler<SubmitDataArgument> = (data) =>
    console.log(`submitted:${data.lastName}, ${data.firstName}`);
  return (
    <div>
      <Controller
        control={control}
        name={'lastName'}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="text"
            label="姓"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name={'firstName'}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type="text"
            label="名"
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        追加する
      </Button>
    </div>
  );
};
