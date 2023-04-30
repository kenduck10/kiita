type User = {
  userId: number;
  lastName: string;
  firstName: string;
};
export default ({ users }: { users: Array<User> }) => {
  console.log(users);
  return <h1>home</h1>;
};

export const getServerSideProps = async () => {
  const response = await (await fetch(`${process.env.KIITA_API_BASE_URL}users`)).json();
  return {
    props: {
      users: response.users,
    },
  };
};
