import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import axios, { HttpStatusCode } from 'axios';
import UserSummaries from '@/features/user/models/UserSummaries';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/components/layouts/Layout';

export const Home: NextPageWithLayout<{ userSummaries: UserSummaries }> = ({
  userSummaries,
}: {
  userSummaries: UserSummaries;
}) => {
  return (
    <>
      <TableContainer>
        <Table component="div" sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead component="div">
            <TableRow component="div">
              <TableCell component="div">ID</TableCell>
              <TableCell component="div" align="right">
                姓
              </TableCell>
              <TableCell component="div" align="right">
                名
              </TableCell>
              <TableCell component="div" align="right">
                メールアドレス
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody component="div">
            {userSummaries.value.map((userSummary) => (
              <TableRow component={Link} href={`/users/${userSummary.id}`} key={userSummary.id}>
                <TableCell component="div">{userSummary.id}</TableCell>
                <TableCell component="div" align="right">
                  {userSummary.lastName}
                </TableCell>
                <TableCell component="div" align="right">
                  {userSummary.firstName}
                </TableCell>
                <TableCell component="div" align="right">
                  {userSummary.mailAddress}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link href={'users/new'}>ユーザー追加</Link>
    </>
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
