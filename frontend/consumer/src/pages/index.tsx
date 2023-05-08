import {
  Button,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import axios, { HttpStatusCode } from 'axios';
import UserSummaries from '@/features/user/models/UserSummaries';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/components/layouts/Layout';
import { useRouter } from 'next/router';
import React from 'react';

export const Home: NextPageWithLayout<{ userSummaries: UserSummaries }> = ({
  userSummaries,
}: {
  userSummaries: UserSummaries;
}) => {
  const router = useRouter();
  const onClickToAdd = async () => {
    await router.push(`/users/new`);
  };
  return (
    <Card sx={{ p: 4 }}>
      <Typography variant={'h5'} sx={{ fontWeight: 'bold' }} textAlign={'center'} mb={4}>
        ユーザー一覧
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Button variant="contained" color="primary" onClick={onClickToAdd} sx={{ mb: 2 }}>
        追加
      </Button>
      <TableContainer>
        <Table component="div" sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead component="div">
            <TableRow component="div">
              <TableCell component="div">ID</TableCell>
              <TableCell component="div">姓</TableCell>
              <TableCell component="div">名</TableCell>
              <TableCell component="div">メールアドレス</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component="div">
            {userSummaries.value.map((userSummary) => (
              <TableRow component={Link} href={`/users/${userSummary.id}`} key={userSummary.id}>
                <TableCell component="div">{userSummary.id}</TableCell>
                <TableCell component="div">{userSummary.lastName}</TableCell>
                <TableCell component="div">{userSummary.firstName}</TableCell>
                <TableCell component="div">{userSummary.mailAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
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
