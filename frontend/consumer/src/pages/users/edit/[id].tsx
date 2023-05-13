import axios, { AxiosError, HttpStatusCode } from 'axios';
import { GetServerSideProps } from 'next';
import User from '@/features/user/models/User';
import { Alert, Button, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import * as yup from 'yup';
import {
  FIRST_NAME_YUP_SCHEMA,
  LAST_NAME_YUP_SCHEMA,
  MAIL_ADDRESS_YUP_SCHEMA,
} from '@/features/user/validations/YupSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MainContentHeader } from '@/components/molecules/MainContentHeader';
import { UserItemsForm } from '@/components/organisms/UserItemsForm';
import { UserUpdateBody, useUserUpdate } from '@/hooks/useUserUpdate';

const errorSchema = yup.object().shape({
  lastName: LAST_NAME_YUP_SCHEMA,
  firstName: FIRST_NAME_YUP_SCHEMA,
  mailAddress: MAIL_ADDRESS_YUP_SCHEMA,
});

export const UserEdit = ({ user }: { user: User }) => {
  const router = useRouter();
  const { doUpdate, isLoading, errorMessage } = useUserUpdate(Number(user.id), async () => await router.push('/'));

  const { control, handleSubmit } = useForm<UserUpdateBody>({
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

  const onClickCancel = async () => await router.push('/');

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 4 }}>
          <MainContentHeader title={'ユーザー編集'} sx={{ mb: 2 }} />
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <UserItemsForm control={control} isLoading={isLoading} />
          <Button variant="contained" color="primary" onClick={handleSubmit(doUpdate)} sx={{ mr: 2 }}>
            保存
          </Button>
          <Button variant="contained" color="secondary" onClick={onClickCancel} sx={{ color: 'white' }}>
            キャンセル
          </Button>
        </Card>
      </Grid>
    </Grid>
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
