import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import axios, { HttpStatusCode } from 'axios';
import UserSummaries from '@/features/user/models/UserSummaries';

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

  if (userSummariesResponse.status !== HttpStatusCode.Ok) {
    return {
      redirect: {
        permanent: false,
        destination: '/error',
      },
    };
  }

  return {
    props: {
      userSummaries: JSON.parse(JSON.stringify(userSummariesResponse.userSummaries)),
    },
  };
};

export default Home;
