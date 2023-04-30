import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

type User = {
  userId: number;
  lastName: string;
  firstName: string;
};
export default ({ users }: { users: Array<User> }) => {
  return (
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
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.userId}</TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">{user.firstName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const getServerSideProps = async () => {
  const response = await (await fetch(`${process.env.KIITA_API_BASE_URL}users`)).json();
  return {
    props: {
      users: response.users,
    },
  };
};
