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
      .then(async () => {
        await router.push('/');
        resetCreateUser();
      })
      .catch(async (error) => {
        if (error.response.status === HttpStatusCode.BadRequest) {
          setCreateUserErrorMessage('入力内容に誤りがあります');
          await router.push('/users/new');
          return;
        }
        await router.push('/error');
      });
  };

  const onClickModify = async () => {
    await router.push('/users/new');
  };

  return (
    createUser && (
      <div>
        <p>{createUser.lastName}</p>
        <p>{createUser.firstName}</p>
        <Button variant="contained" onClick={onClickAdd}>
          追加する
        </Button>
        <Button variant="contained" onClick={onClickModify}>
          修正する
        </Button>
      </div>
    )
  );
};

export default UserNewConfirm;
