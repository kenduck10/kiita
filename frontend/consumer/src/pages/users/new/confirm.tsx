import { useRouter } from 'next/router';
import { Button, Card, Grid } from '@mui/material';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { createUserErrorMessageState, createUserState } from '@/stores/user';
import React from 'react';
import { UserItems } from '@/components/organisms/UserItems';
import { MainContentHeader } from '@/components/molecules/MainContentHeader';
import { UserCreateBody, useUserCreate } from '@/hooks/useUserCreate';

export const UserNewConfirm = () => {
  const createUser = useRecoilValue<UserCreateBody>(createUserState);
  const resetCreateUser = useResetRecoilState(createUserState);
  const setCreateUserErrorMessage = useSetRecoilState<string>(createUserErrorMessageState);
  const router = useRouter();
  const { doCreate, isLoading } = useUserCreate(
    async () => {
      await router.push('/');
      resetCreateUser();
    },
    async (errorMessage: string) => {
      setCreateUserErrorMessage(errorMessage);
      await router.push('/users/new');
    }
  );
  const onClickAdd = () => {
    doCreate(createUser).then();
  };

  const onClickModify = async () => {
    await router.push('/users/new');
  };

  return (
    createUser && (
      <Grid container justifyContent={'center'}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4 }}>
            <MainContentHeader title={'ユーザー追加'} sx={{ mb: 2 }} />
            <UserItems user={createUser} sx={{ mb: 2 }} />
            <Button variant="contained" color="primary" onClick={onClickAdd} disabled={isLoading} sx={{ mr: 2 }}>
              追加
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={onClickModify}
              disabled={isLoading}
              sx={{ color: 'white' }}
            >
              修正
            </Button>
          </Card>
        </Grid>
      </Grid>
    )
  );
};

export default UserNewConfirm;
