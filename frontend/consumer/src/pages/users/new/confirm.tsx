import axios, { HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { createUserErrorMessageState, createUserState } from '@/stores/user';

type SubmitArguments = {
  lastName: string;
  firstName: string;
};

export const UserNewConfirm = () => {
  const createUser = useRecoilValue<SubmitArguments>(createUserState);
  const resetCreateUser = useResetRecoilState(createUserState);
  const setCreateUserErrorMessage = useSetRecoilState<string>(createUserErrorMessageState);
  const router = useRouter();

  const onClickAdd = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users`, createUser)
      .then(() => {
        resetCreateUser();
        router.push('/');
      })
      .catch((error) => {
        if (error.response.status === HttpStatusCode.BadRequest) {
          setCreateUserErrorMessage('入力内容に誤りがあります');
          router.push('/users/new');
          return;
        }
        router.push('/error');
      });
  };
  return (
    createUser && (
      <div>
        <p suppressHydrationWarning>{createUser.lastName}</p>
        <p suppressHydrationWarning>{createUser.firstName}</p>
        <Button variant="contained" onClick={onClickAdd}>
          追加
        </Button>
      </div>
    )
  );
};

export default UserNewConfirm;
