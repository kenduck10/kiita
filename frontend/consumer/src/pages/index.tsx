import { Button } from '@mui/material';

type User = {
  userId: number;
  lastName: string;
  firstName: string;
};
export default ({ users }: { users: Array<User> }) => {
  return (
    <div>
      <Button variant="contained">成功</Button>
      <h1>home</h1>
    </div>
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
