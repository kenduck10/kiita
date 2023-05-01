import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import UserSummaries from '@/features/user/models/UserSummaries';
import { GetUsersResponse } from '@/pages/api/users';

export const Home = ({ userSummaries }: { userSummaries: UserSummaries }) => {
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">姓</TableCell>
              <TableCell align="right">名</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userSummaries.value.map((userSummary) => (
              <TableRow key={userSummary.id}>
                <TableCell>{userSummary.id}</TableCell>
                <TableCell align="right">{userSummary.lastName}</TableCell>
                <TableCell align="right">{userSummary.firstName}</TableCell>
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
  const userSummaries = await axios
    .get(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users`)
    .then((response: AxiosResponse<GetUsersResponse>) => new UserSummaries(response.data))
    .catch(() => undefined);

  if (userSummaries === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/users/new',
      },
    };
  }

  return {
    props: {
      userSummaries: JSON.parse(JSON.stringify(userSummaries)),
    },
  };
};

export default Home;
