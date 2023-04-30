import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { ControlledTextField } from '@/components/elements/ControlledTextField';

type SubmitDataArgument = {
  lastName: string;
  firstName: string;
};

const errorScheme = yup.object().shape({
  lastName: yup.string().required('姓の入力は必須です').max(50, '姓は50文字以内で入力してください'),
  firstName: yup.string().required('名の入力は必須です').max(50, '名は50文字以内で入力してください'),
});
export const NewUser = () => {
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
      <ControlledTextField control={control} name={'lastName'} type={'text'} label={'姓'} />
      <ControlledTextField control={control} name={'firstName'} type={'text'} label={'名'} />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        追加する
      </Button>
    </div>
  );
};

export default NewUser;
