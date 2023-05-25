import { useRouter } from 'next/router';
import { Button, Card, Grid } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { createUserErrorMessageState, createUserState } from '@/stores/user';
import React, { useEffect, useState } from 'react';
import { UserItems } from '@/components/organisms/UserItems';
import { MainContentHeader } from '@/components/molecules/MainContentHeader';
import { UserCreateBody, useUserCreate } from '@/hooks/useUserCreate';
import { GetServerSidePropsContext } from 'next';
import { buildServerSideRedirect } from '@/utils/functions/route';

export const UserNewConfirm = () => {
  const router = useRouter();

  const createUser = useRecoilValue<UserCreateBody>(createUserState);
  const [displayCreateUser, setDisplayCreateUser] = useState<UserCreateBody>();

  const setCreateUserErrorMessage = useSetRecoilState<string>(createUserErrorMessageState);

  const { doCreate, isLoading } = useUserCreate(
    async () => {
      await router.push('/');
    },
    async (errorMessage: string) => {
      setCreateUserErrorMessage(errorMessage);
      await router.push('/users/new');
    }
  );

  useEffect(() => {
    setDisplayCreateUser(createUser);
  }, []);

  const onClickAdd = () => {
    doCreate(createUser).then();
  };

  const onClickModify = async () => {
    await router.push('/users/new');
  };

  return (
    displayCreateUser && (
      <Grid container justifyContent={'center'}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4 }}>
            <MainContentHeader title={'ユーザー追加'} sx={{ mb: 2 }} />
            <UserItems user={displayCreateUser} sx={{ mb: 2 }} />
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

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const referer = context.req.headers.referer;
  if (referer !== 'http://localhost:3000/users/new') {
    return buildServerSideRedirect('/users/new');
  }

  return {
    props: {},
  };
};
