import axios, { AxiosError, HttpStatusCode } from 'axios';
import { GetServerSideProps } from 'next';
import User from '@/features/user/models/User';
import { Alert, Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSubmit } from '@/hooks/useSubmit';
import { useLoad } from '@/hooks/useLoad';
import Link from 'next/link';
import { SelectDialog } from '@/components/molecules/SelectDialog';
import { UserItems } from '@/components/organisms/UserItems';

export const UserDetail = ({ user }: { user: User }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoading, startLoad } = useLoad();
  const { isSubmitting, startSubmit, stopSubmit } = useSubmit();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const onClickEditButton = async () => {
    startLoad();
    await router.push(`/users/edit/${user.id}`);
  };
  const onClickDeleteButton = async () => {
    setIsOpenDeleteDialog(true);
  };

  const onClickDeleteAgreement = async () => {
    startSubmit();
    await axios
      .delete(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users/${user.id}`)
      .then(async () => await router.push('/'))
      .catch(async (error) => {
        if (error.response.status === HttpStatusCode.NotFound) {
          setErrorMessage('このユーザーは既に削除されています');
          setIsOpenDeleteDialog(false);
          return;
        }
        await router.push('/error');
      })
      .finally(() => stopSubmit());
  };

  const onClickDeleteCancel = () => {
    setIsOpenDeleteDialog(false);
  };

  const isDisabled = isSubmitting || isLoading;
  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 4 }}>
          <Typography variant={'h5'} sx={{ fontWeight: 'bold' }} textAlign={'center'} mb={4}>
            ユーザー詳細
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <Box mb={2} display={'flex'} justifyContent={'space-between'}>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={onClickEditButton}
                disabled={isDisabled}
                sx={{ mr: 2 }}
              >
                編集
              </Button>
              <Button variant="contained" color="error" onClick={onClickDeleteButton} disabled={isDisabled}>
                削除
              </Button>
            </Box>
            <Link href={'/'}>一覧へ</Link>
          </Box>
          <UserItems user={user} />
          <SelectDialog
            open={isOpenDeleteDialog}
            onClose={() => setIsOpenDeleteDialog(false)}
            dialogTitle={'本当に削除しますか？'}
            dialogContentText={'削除したユーザーは元に戻すことができません'}
            dialogButtons={[
              { action: onClickDeleteCancel, label: 'キャンセル', color: 'secondary' },
              { action: onClickDeleteAgreement, label: '削除', color: 'error' },
            ]}
          />
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

export default UserDetail;
