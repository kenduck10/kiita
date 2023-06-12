import { Button, Grid } from '@mui/material';
import { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import React from 'react';

export const Signup: NextPageWithLayout = () => {
  const router = useRouter();

  // const onClickToAdd = async () => {
  //   await router.push(PAGE_PATH.USER_NEW);
  // };

  // const tableHeads: { key: keyof UserSummary; name: string }[] = [
  //   { key: 'id', name: 'ID' },
  //   { key: 'lastName', name: '姓' },
  //   {
  //     key: 'firstName',
  //     name: '名',
  //   },
  //   { key: 'mailAddress', name: 'メールアドレス' },
  // ];

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={6}>
        <Button id={'signup-button'} variant="contained" color="primary">
          登録する
        </Button>
      </Grid>
    </Grid>
  );
};

export default Signup;
