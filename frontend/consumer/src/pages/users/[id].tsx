import axios, { HttpStatusCode } from 'axios';
import { GetServerSideProps } from 'next';
import User from '@/features/user/models/User';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSubmit } from '@/hooks/useSubmit';
import { useLoad } from '@/hooks/useLoad';

export const UserDetail = ({ user }: { user: User }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoading, startLoad } = useLoad();
  const { isSubmitting, startSubmit } = useSubmit();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const onClickEditButton = () => {
    startLoad();
    router.push(`/users/edit/${user.id}`);
  };
  const onClickDeleteButton = async () => {
    setIsOpenDeleteDialog(true);
  };

  const onClickDeleteAgreement = async () => {
    startSubmit();
    await axios
      .delete(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users/${user.id}`)
      .then(() => router.push('/'))
      .catch((error) => {
        if (error.response.status === HttpStatusCode.NotFound) {
          setErrorMessage('このユーザーは既に削除されています');
          setIsOpenDeleteDialog(false);
          return;
        }
        router.push('/error');
      });
  };

  const onClickDeleteCancel = () => {
    setIsOpenDeleteDialog(false);
  };

  const onClickToHome = async () => {
    startLoad();
    await router.push(`/`);
  };

  const isDisabled = isSubmitting || isLoading;
  return (
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <p>{user.id}</p>
      <p>{user.lastName}</p>
      <p>{user.firstName}</p>
      <p>{user.mailAddress}</p>
      <Button variant="contained" color="primary" onClick={onClickEditButton} disabled={isDisabled}>
        編集
      </Button>
      <Button variant="contained" color="error" onClick={onClickDeleteButton} disabled={isDisabled}>
        削除
      </Button>
      <Button variant="contained" color="secondary" onClick={onClickToHome} disabled={isDisabled}>
        ホーム
      </Button>
      <Dialog open={isOpenDeleteDialog} onClose={() => setIsOpenDeleteDialog(false)}>
        <DialogTitle>{'本当に削除しますか？'}</DialogTitle>
        <DialogContent>
          <DialogContentText>一旦削除したユーザーは元に戻すことができません</DialogContentText>
          <DialogActions>
            <Button onClick={onClickDeleteCancel}>キャンセル</Button>
            <Button onClick={onClickDeleteAgreement}>削除</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
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
    .catch((error) => {
      return {
        user: undefined,
        status: error.status,
      };
    });

  if (userResponse.status === HttpStatusCode.NotFound) {
    return {
      redirect: {
        permanent: false,
        destination: '/error',
      },
    };
  }
  return {
    props: {
      user: JSON.parse(JSON.stringify(userResponse.user)),
    },
  };
};

export default UserDetail;
