import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { ControlledTextField } from '@/components/elements/ControlledTextField';
import { FIRST_NAME_YUP_SCHEMA, LAST_NAME_YUP_SCHEMA } from '@/features/user/validations/YupSchema';
import axios, { HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';

type SubmitArguments = {
  lastName: string;
  firstName: string;
};

const errorSchema = yup.object().shape({
  lastName: LAST_NAME_YUP_SCHEMA,
  firstName: FIRST_NAME_YUP_SCHEMA,
});

export const NewUser = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<SubmitArguments>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      lastName: '',
      firstName: '',
    },
    // resolver: yupResolver(errorSchema),
  });
  const onSubmit: SubmitHandler<SubmitArguments> = async (data) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users`, data)
      .then(() => router.push('/'))
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === HttpStatusCode.BadRequest) {
          console.log('入力内容に誤りがあります');
          return;
        }
        router.push('/error');
      });
  };

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
