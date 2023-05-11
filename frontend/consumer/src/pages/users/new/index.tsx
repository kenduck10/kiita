import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import { ControlledTextField } from '@/components/elements/ControlledTextField';
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
          <Typography variant={'h5'} sx={{ fontWeight: 'bold' }} textAlign={'center'} mb={4}>
            ユーザー追加
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {createUserErrorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {createUserErrorMessage}
            </Alert>
          )}
          <Typography variant={'h6'} sx={{ fontWeight: 'bold' }} mb={2}>
            名前
          </Typography>
          <Box mb={2}>
            <ControlledTextField
              control={control}
              name={'lastName'}
              type={'text'}
              label={'姓'}
              disabled={isLoading}
              sx={{ mr: 2, width: '120px' }}
            />
            <ControlledTextField
              control={control}
              name={'firstName'}
              type={'text'}
              label={'名'}
              disabled={isLoading}
              sx={{ width: '120px' }}
            />
          </Box>
          <Typography variant={'h6'} sx={{ fontWeight: 'bold' }} mb={2}>
            メールアドレス
          </Typography>
          <Box mb={4}>
            <ControlledTextField
              control={control}
              name={'mailAddress'}
              type={'email'}
              disabled={isLoading}
              sx={{ maxWidth: '400px' }}
              fullWidth={true}
            />
          </Box>
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
