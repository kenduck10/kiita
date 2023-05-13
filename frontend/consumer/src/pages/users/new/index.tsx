import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Button, Card, Grid } from '@mui/material';
import {
  FIRST_NAME_YUP_SCHEMA,
  LAST_NAME_YUP_SCHEMA,
  MAIL_ADDRESS_YUP_SCHEMA,
} from '@/features/user/validations/YupSchema';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { createUserErrorMessageState, createUserState } from '@/stores/user';
import { useLoad } from '@/hooks/useLoad';
import React from 'react';
import { MainContentHeader } from '@/components/molecules/MainContentHeader';
import { UserItemsForm } from '@/components/organisms/UserItemsForm';

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

export const UserNew = () => {
  const router = useRouter();
  const [createUser, setCreateUser] = useRecoilState(createUserState);
  const createUserErrorMessage = useRecoilValue(createUserErrorMessageState);
  const resetCreateUserErrorMessage = useResetRecoilState(createUserErrorMessageState);
  const { isLoading, startLoad } = useLoad();

  const { control, handleSubmit } = useForm<SubmitArguments>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      lastName: createUser.lastName,
      firstName: createUser.firstName,
      mailAddress: createUser.mailAddress,
    },
    resolver: yupResolver(errorSchema),
  });
  const onClickCancel = async () => await router.push('/');

  const confirmPageUrl = '/users/new/confirm';
  const onClickToConfirm: SubmitHandler<SubmitArguments> = async (data) => {
    startLoad();
    setCreateUser({ lastName: data.lastName, firstName: data.firstName, mailAddress: data.mailAddress });
    await router.push({ pathname: confirmPageUrl, query: data }, confirmPageUrl);
    resetCreateUserErrorMessage();
  };

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 4 }}>
          <MainContentHeader title={'ユーザー追加'} sx={{ mb: 2 }} />
          {createUserErrorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {createUserErrorMessage}
            </Alert>
          )}
          <UserItemsForm control={control} isLoading={isLoading} />
          <Button variant="contained" color="primary" onClick={handleSubmit(onClickToConfirm)} sx={{ mr: 2 }}>
            確認
          </Button>
          <Button variant="contained" color="secondary" onClick={onClickCancel} sx={{ color: 'white' }}>
            キャンセル
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default UserNew;
