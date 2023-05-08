import Link from 'next/link';
import {
  Button,
  Card,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios, { HttpStatusCode } from 'axios';
import UserSummaries from '@/features/user/models/UserSummaries';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/components/layouts/Layout';
import { useRouter } from 'next/router';
import React from 'react';
import styled from '@emotion/styled';

const StyledTableHeadCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'black',
    color: 'white',
  },
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f5f5f5',
  },
  '&:hover': {
    opacity: 0.7,
  },
});
export const Home: NextPageWithLayout<{ userSummaries: UserSummaries }> = ({
  userSummaries,
}: {
  userSummaries: UserSummaries;
}) => {
  const router = useRouter();
  const onClickToAdd = async () => {
    await router.push(`/users/new`);
  };
  // @ts-ignore
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
          <TableContainer>
            <Table component="div" aria-label="user table">
              <TableHead component="div">
                <TableRow component="div">
                  <StyledTableHeadCell component="div">ID</StyledTableHeadCell>
                  <StyledTableHeadCell component="div">姓</StyledTableHeadCell>
                  <StyledTableHeadCell component="div">名</StyledTableHeadCell>
                  <StyledTableHeadCell component="div">メールアドレス</StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody component="div">
                {userSummaries.value.map((userSummary) => (
                  <StyledTableRow component={Link} href={`/users/${userSummary.id}`} key={userSummary.id}>
                    <TableCell component="div">{userSummary.id}</TableCell>
                    <TableCell component="div">{userSummary.lastName}</TableCell>
                    <TableCell component="div">{userSummary.firstName}</TableCell>
                    <TableCell component="div">{userSummary.mailAddress}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
