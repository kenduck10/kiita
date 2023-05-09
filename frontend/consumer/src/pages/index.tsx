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
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import axios, { HttpStatusCode } from 'axios';
import UserSummaries from '@/features/user/models/UserSummaries';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/components/layouts/Layout';
import { useRouter } from 'next/router';
import React, { MouseEventHandler, useState } from 'react';
import styled from '@emotion/styled';

const StyledTableHeadCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'black',
    color: 'white',
  },
});

const StyledTableBodyRow = styled(TableRow)<{ onClick: MouseEventHandler<HTMLTableRowElement> }>({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f5f5f5',
  },
  '&:last-child *': {
    // border: 0,
  },
  '&:hover': {
    opacity: 0.6,
  },
  '&': {
    textDecoration: 'none',
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
  const onClickUser = async (userId: number) => {
    await router.push(`/users/${userId}`);
  };

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

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
            <Table aria-label="user table">
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell>ID</StyledTableHeadCell>
                  <StyledTableHeadCell>姓</StyledTableHeadCell>
                  <StyledTableHeadCell>名</StyledTableHeadCell>
                  <StyledTableHeadCell>メールアドレス</StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userSummaries.value.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((userSummary) => (
                  <StyledTableBodyRow key={userSummary.id} onClick={() => onClickUser(userSummary.id)}>
                    <TableCell>{userSummary.id}</TableCell>
                    <TableCell>{userSummary.lastName}</TableCell>
                    <TableCell>{userSummary.firstName}</TableCell>
                    <TableCell>{userSummary.mailAddress}</TableCell>
                  </StyledTableBodyRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    count={userSummaries.value.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[]}
                    onPageChange={onPageChange}
                  />
                </TableRow>
              </TableFooter>
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
