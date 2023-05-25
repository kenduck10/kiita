import axios, { AxiosError, HttpStatusCode } from 'axios';
import { GetServerSideProps } from 'next';
import User from '@/features/user/models/User';
import { Alert, Box, Button, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Link from 'next/link';
import { SelectDialog } from '@/components/molecules/SelectDialog';
import { UserItems } from '@/components/organisms/UserItems';
import { MainContentHeader } from '@/components/molecules/MainContentHeader';
import { useUserDelete } from '@/hooks/useUserDelete';
import { buildServerSideRedirect } from '@/utils/functions/route';

export const UserDetail = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const { doDelete, isLoading, errorMessage } = useUserDelete(Number(user.id), async () => await router.push('/'));

  const onClickEditButton = async () => {
    await router.push(`/users/edit/${user.id}`);
  };
  const onClickDeleteButton = async () => {
    setIsOpenDeleteDialog(true);
  };

  const onClickDeleteAgreement = () => {
    doDelete().then(() => setIsOpenDeleteDialog(false));
  };

  const onClickDeleteCancel = () => {
    setIsOpenDeleteDialog(false);
  };

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 4 }}>
          <MainContentHeader title={'ユーザー詳細'} sx={{ mb: 2 }} />
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
                disabled={isLoading}
                sx={{ mr: 2 }}
              >
                編集
              </Button>
              <Button variant="contained" color="error" onClick={onClickDeleteButton} disabled={isLoading}>
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
            isLoading={isLoading}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params === undefined) {
    return buildServerSideRedirect('/error');
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
    return buildServerSideRedirect('/notFound');
  }

  return buildServerSideRedirect('/error');
};

export default UserDetail;
