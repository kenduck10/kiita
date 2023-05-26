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
import React, { useEffect, useState } from 'react';
import { MainContentHeader } from '@/components/molecules/MainContentHeader';
import { UserItemsForm } from '@/components/organisms/UserItemsForm';
import { GetServerSidePropsContext } from 'next';
import { UserCreateBody } from '@/hooks/useUserCreate';
import { PAGE_PATH } from '@/utils/consts/route';

const errorSchema = yup.object().shape({
  lastName: LAST_NAME_YUP_SCHEMA,
  firstName: FIRST_NAME_YUP_SCHEMA,
  mailAddress: MAIL_ADDRESS_YUP_SCHEMA,
});

export const UserNew = ({ isFromConfirm }: { isFromConfirm: boolean }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [createUser, setCreateUser] = useRecoilState(createUserState);
  const createUserErrorMessage = useRecoilValue(createUserErrorMessageState);

  const resetCreateUser = useResetRecoilState(createUserState);
  const resetCreateUserErrorMessage = useResetRecoilState(createUserErrorMessageState);

  const { control, handleSubmit, reset } = useForm<UserCreateBody>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      lastName: '',
      firstName: '',
      mailAddress: '',
    },
    resolver: yupResolver(errorSchema),
  });

  useEffect(() => {
    if (isFromConfirm) {
      reset(createUser);
      return;
    }
    resetCreateUser();
    resetCreateUserErrorMessage();
  }, []);

  const onClickCancel = async () => await router.push(PAGE_PATH.HOME);
  const onClickToConfirm: SubmitHandler<UserCreateBody> = async (createUser) => {
    setIsLoading(true);
    setCreateUser(createUser);
    await router.push(PAGE_PATH.USER_NEW_CONFIRM);
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

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const referer = context.req.headers.referer;
  return {
    props: {
      isFromConfirm: referer === 'http://localhost:3000/' + PAGE_PATH.USER_NEW_CONFIRM,
    },
  };
};
