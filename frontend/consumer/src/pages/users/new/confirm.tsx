import * as yup from 'yup';
import { FIRST_NAME_YUP_SCHEMA, LAST_NAME_YUP_SCHEMA } from '@/features/user/validations/YupSchema';
import { useForm } from 'react-hook-form';
import axios, { HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';

type SubmitArguments = {
  lastName: string;
  firstName: string;
};

const errorSchema = yup.object().shape({
  lastName: LAST_NAME_YUP_SCHEMA,
  firstName: FIRST_NAME_YUP_SCHEMA,
});

export const UserNewConfirm = () => {
  const { push, query } = useRouter();
  const submitArguments = query as SubmitArguments;
  const [errorMessage, setErrorMessage] = useState('');

  const { control, handleSubmit } = useForm<SubmitArguments>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      lastName: '',
      firstName: '',
    },
    resolver: yupResolver(errorSchema),
  });
  const onClickToHome = () => push(`/`);
  const onClickAdd = async () => {
    setErrorMessage('');
    await axios
      .post(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users`, submitArguments)
      .then(() => push('/'))
      .catch((error) => {
        if (error.response.status === HttpStatusCode.BadRequest) {
          setErrorMessage('入力内容に誤りがあります');
          return;
        }
        push('/error');
      });
  };
  return (
    <div>
      <p>{submitArguments.lastName}</p>
      <p>{submitArguments.firstName}</p>
      <Button variant="contained" onClick={onClickAdd}>
        追加
      </Button>
    </div>
  );
};

export default UserNewConfirm;
