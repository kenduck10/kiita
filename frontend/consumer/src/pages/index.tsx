import { Button, Card, Divider, Grid, Typography } from '@mui/material';
import axios, { HttpStatusCode } from 'axios';
import UserSummaries from '@/features/user/models/UserSummaries';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/components/layouts/Layout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { LinkTable } from '@/components/molecules/LinkTable';

export const Home: NextPageWithLayout<{ userSummaries: UserSummaries }> = ({
  userSummaries,
}: {
  userSummaries: UserSummaries;
}) => {
  const router = useRouter();

  const onClickToAdd = async () => {
    await router.push(`/users/new`);
  };
  const onClickUser = async (userId: number) => {
    await router.push(`/users/${userId}`);
  };

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userSummaries.value.length) : 0;

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 4 }}>
          <Typography variant={'h5'} sx={{ fontWeight: 'bold' }} textAlign={'center'} mb={4}>
            ユーザー一覧
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Button variant="contained" color="primary" onClick={onClickToAdd} sx={{ mb: 2 }}>
            追加
          </Button>
          <LinkTable
            rows={userSummaries.value}
            tableHeadNames={['ID', '姓', '名', 'メールアドレス']}
            router={router}
            linkParentPath={'/users/'}
          ></LinkTable>
        </Card>
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = async () => {
  const userSummariesResponse = await axios
    .get(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users`)
    .then((response) => {
      return {
        userSummaries: new UserSummaries(response.data),
        status: response.status,
      };
    })
    .catch((error) => {
      return {
        userSummaries: undefined,
        status: error.status,
      };
    });

  const status = userSummariesResponse.status;
  if (status === HttpStatusCode.Ok) {
    return {
      props: {
        userSummaries: JSON.parse(JSON.stringify(userSummariesResponse.userSummaries)),
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

Home.getLayout = (page, router) => {
  return <Layout>{page}</Layout>;
};
export default Home;
