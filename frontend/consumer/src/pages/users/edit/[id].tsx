import axios, { HttpStatusCode } from 'axios';
import { GetServerSideProps } from 'next';
import User from '@/features/user/models/User';
import { Alert, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';
import { FIRST_NAME_YUP_SCHEMA, LAST_NAME_YUP_SCHEMA } from '@/features/user/validations/YupSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextField } from '@/components/elements/ControlledTextField';

type SubmitArguments = {
  lastName: string;
  firstName: string;
};

const errorSchema = yup.object().shape({
  lastName: LAST_NAME_YUP_SCHEMA,
  firstName: FIRST_NAME_YUP_SCHEMA,
});

export const UserEdit = ({ user }: { user: User }) => {
  const router = useRouter();
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

  const onSubmit: SubmitHandler<SubmitArguments> = async (data) => {
    setErrorMessage('');
    console.log(data);
    // await axios
    //     .post(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users`, data)
    //     .then(() => router.push('/'))
    //     .catch((error) => {
    //       if (error.response.status === HttpStatusCode.BadRequest) {
    //         setErrorMessage('入力内容に誤りがあります');
    //         return;
    //       }
    //       router.push('/error');
    //     });
  };

  return (
    <div>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <ControlledTextField
        control={control}
        name={'lastName'}
        type={'text'}
        label={'姓'}
        defaultValue={user.lastName}
      />
      <ControlledTextField
        control={control}
        name={'firstName'}
        type={'text'}
        label={'名'}
        defaultValue={user.firstName}
      />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        保存
      </Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/error',
      },
    };
  }

  const id = context.params.id;
  const userResponse = await axios
    .get(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users/${id}`)
    .then((response) => {
      return {
        user: new User(Number(id), response.data),
        status: response.status,
      };
    })
    .catch((error) => {
      return {
        user: undefined,
        status: error.status,
      };
    });

  if (userResponse.status === HttpStatusCode.NotFound) {
    return {
      redirect: {
        permanent: false,
        destination: '/error',
      },
    };
  }
  return {
    props: {
      user: JSON.parse(JSON.stringify(userResponse.user)),
    },
  };
};

export default UserEdit;
