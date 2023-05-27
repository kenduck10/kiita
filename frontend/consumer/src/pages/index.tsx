import { Button, Card, Grid } from '@mui/material';
import UserSummaries from '@/features/user/models/UserSummaries';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/components/layouts/Layout';
import { useRouter } from 'next/router';
import React from 'react';
import { LinkTable } from '@/components/molecules/LinkTable';
import UserSummary from '@/features/user/models/UserSummary';
import { MainContentHeader } from '@/components/molecules/MainContentHeader';
import { fetchUserSummaries } from '@/features/user/utils/functions/ssr';
import { PAGE_PATH, PAGE_PATH_BUILDER } from '@/utils/consts/route';

export const Home: NextPageWithLayout<{ userSummaries: UserSummaries }> = ({
  userSummaries,
}: {
  userSummaries: UserSummaries;
}) => {
  const router = useRouter();

  const onClickToAdd = async () => {
    await router.push(PAGE_PATH.USER_NEW);
  };

  const tableHeads: { key: keyof UserSummary; name: string }[] = [
    { key: 'id', name: 'ID' },
    { key: 'lastName', name: '姓' },
    {
      key: 'firstName',
      name: '名',
    },
    { key: 'mailAddress', name: 'メールアドレス' },
  ];

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 4 }}>
          <MainContentHeader title={'ユーザー一覧'} sx={{ mb: 2 }} />
          <Button id={'add-user-button'} variant="contained" color="primary" onClick={onClickToAdd} sx={{ mb: 2 }}>
            追加
          </Button>
          <LinkTable
            tableHeads={tableHeads}
            rows={userSummaries.value}
            rowsPerPage={5}
            router={router}
            link={PAGE_PATH_BUILDER.USER_DETAIL}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = async () => {
  return fetchUserSummaries();
};

Home.getLayout = (page, router) => {
  return <Layout>{page}</Layout>;
};
export default Home;
