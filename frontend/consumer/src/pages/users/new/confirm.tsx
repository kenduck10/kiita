import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import { Button, Card, Divider, Grid, Typography } from '@mui/material';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { createUserErrorMessageState, createUserState } from '@/stores/user';
import { useSubmit } from '@/hooks/useSubmit';
import { useLoad } from '@/hooks/useLoad';
import React from 'react';
import { UserItems } from '@/components/organisms/UserItems';

type SubmitArguments = {
  lastName: string;
  firstName: string;
  mailAddress: string;
};

export const UserNewConfirm = () => {
  const createUser = useRecoilValue<SubmitArguments>(createUserState);
  const resetCreateUser = useResetRecoilState(createUserState);
  const setCreateUserErrorMessage = useSetRecoilState<string>(createUserErrorMessageState);
  const router = useRouter();
  const { isSubmitting, startSubmit } = useSubmit();
  const { isLoading, startLoad } = useLoad();

  const onClickAdd = async () => {
    startSubmit();
    await axios
      .post(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users`, createUser)
      .then(async () => {
        await router.push('/');
        resetCreateUser();
      })
      .catch(async (error: AxiosError) => {
        const expectedStatuses = [HttpStatusCode.BadRequest, HttpStatusCode.Conflict];
        const actualStatus = error.response?.status;
        if (!actualStatus || !expectedStatuses.includes(actualStatus)) {
          await router.push('/error');
          return;
        }

        if (actualStatus === HttpStatusCode.BadRequest) {
          setCreateUserErrorMessage('入力内容に誤りがあります');
        } else if (actualStatus === HttpStatusCode.Conflict) {
          setCreateUserErrorMessage('指定のメールアドレスは既に利用されています');
        }
        await router.push('/users/new');
        return;
      });
  };

  const onClickModify = async () => {
    startLoad();
    await router.push('/users/new');
  };

  const isDisabled = isSubmitting || isLoading;

  return (
    createUser && (
      <Grid container justifyContent={'center'}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4 }}>
            <Typography variant={'h5'} sx={{ fontWeight: 'bold' }} textAlign={'center'} mb={4}>
              ユーザー追加
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <UserItems user={createUser} />
            <Button variant="contained" color="primary" onClick={onClickAdd} sx={{ mr: 2 }}>
              追加
            </Button>
            <Button variant="contained" color="secondary" onClick={onClickModify} sx={{ color: 'white' }}>
              修正
            </Button>
          </Card>
        </Grid>
      </Grid>
    )
  );
};

export default UserNewConfirm;
