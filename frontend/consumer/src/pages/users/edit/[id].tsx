import axios, { AxiosError, HttpStatusCode } from 'axios';
import { GetServerSideProps } from 'next';
import User from '@/features/user/models/User';
import { Alert, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';
import {
  FIRST_NAME_YUP_SCHEMA,
  LAST_NAME_YUP_SCHEMA,
  MAIL_ADDRESS_YUP_SCHEMA,
} from '@/features/user/validations/YupSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextField } from '@/components/elements/ControlledTextField';
import { useSubmit } from '@/hooks/useSubmit';

type SubmitArguments = {
  lastName: string;
  firstName: string;
  mailAddress: string;
};

const errorSchema = yup.object().shape({
  lastName: LAST_NAME_YUP_SCHEMA,
  firstName: FIRST_NAME_YUP_SCHEMA,
  mailAddress: MAIL_ADDRESS_YUP_SCHEMA,
});

export const UserEdit = ({ user }: { user: User }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { isSubmitting, startSubmit, stopSubmit } = useSubmit();

  const { control, handleSubmit } = useForm<SubmitArguments>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      lastName: user.lastName,
      firstName: user.firstName,
      mailAddress: user.mailAddress,
    },
    resolver: yupResolver(errorSchema),
  });

  const onClickSave: SubmitHandler<SubmitArguments> = async (data) => {
    startSubmit();
    await axios
      .put(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users/${user.id}`, data)
      .then(async () => {
        await router.push(`/users/${user.id}`);
      })
      .catch(async (error: AxiosError) => {
        const expectedStatuses = [HttpStatusCode.BadRequest, HttpStatusCode.NotFound, HttpStatusCode.Conflict];
        const actualStatus = error.response?.status;
        if (!actualStatus || !expectedStatuses.includes(actualStatus)) {
          await router.push('/error');
          return;
        }

        if (actualStatus === HttpStatusCode.BadRequest) {
          setErrorMessage('入力内容に誤りがあります');
          return;
        }
        if (actualStatus === HttpStatusCode.NotFound) {
          setErrorMessage('このユーザーは既に削除されています');
          return;
        }
        if (actualStatus === HttpStatusCode.Conflict) {
          setErrorMessage('指定のメールアドレスは既に利用されています');
          return;
        }
      })
      .finally(() => stopSubmit());
  };

  const onClickCancel = () => router.back();

  return (
    <div>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <ControlledTextField control={control} name={'lastName'} type={'text'} label={'姓'} disabled={isSubmitting} />
      <ControlledTextField control={control} name={'firstName'} type={'text'} label={'名'} disabled={isSubmitting} />
      <ControlledTextField
        control={control}
        name={'mailAddress'}
        type={'email'}
        label={'メールアドレス'}
        disabled={isSubmitting}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit(onClickSave)}>
        保存
      </Button>
      <Button variant="contained" color="secondary" onClick={handleSubmit(onClickCancel)}>
        キャンセル
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
    .catch((error: AxiosError) => {
      return {
        user: undefined,
        status: error.response?.status,
      };
    });

  const status = userResponse.status;
  if (status === HttpStatusCode.Ok) {
    return {
      props: {
        user: JSON.parse(JSON.stringify(userResponse.user)),
      },
    };
  }

  if (userResponse.status === HttpStatusCode.NotFound) {
    return {
      redirect: {
        permanent: false,
        destination: '/notFound',
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: '/error',
    },
  };
};

export default UserEdit;
