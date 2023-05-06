import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { createUserErrorMessageState, createUserState } from '@/stores/user';
import { useSubmit } from '@/hooks/useSubmit';
import { useLoad } from '@/hooks/useLoad';

type SubmitArguments = {
  lastName: string;
  firstName: string;
  mailAddress: string;
};

export const UserNewConfirm = () => {
  const createUser = useRecoilValue<SubmitArguments>(createUserState);
  const resetCreateUser = useResetRecoilState(createUserState);
  const setCreateUserErrorMessage = useSetRecoilState<string>(createUserErrorMessageState);
  const router = useRouter();
  const { isSubmitting, startSubmit } = useSubmit();
  const { isLoading, startLoad } = useLoad();

  const onClickAdd = async () => {
    startSubmit();
    await axios
      .post(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users`, createUser)
      .then(async () => {
        await router.push('/');
        resetCreateUser();
      })
      .catch(async (error: AxiosError) => {
        const expectedStatuses = [HttpStatusCode.BadRequest, HttpStatusCode.Conflict];
        const actualStatus = error.response?.status;
        if (!actualStatus || !expectedStatuses.includes(actualStatus)) {
          await router.push('/error');
          return;
        }

        if (actualStatus === HttpStatusCode.BadRequest) {
          setCreateUserErrorMessage('入力内容に誤りがあります');
        } else if (actualStatus === HttpStatusCode.Conflict) {
          setCreateUserErrorMessage('指定のメールアドレスは既に利用されています');
        }
        await router.push('/users/new');
        return;
      });
  };

  const onClickModify = async () => {
    startLoad();
    await router.push('/users/new');
  };

  const isDisabled = isSubmitting || isLoading;

  return (
    createUser && (
      <div>
        <p suppressHydrationWarning>{createUser.lastName}</p>
        <p suppressHydrationWarning>{createUser.firstName}</p>
        <p suppressHydrationWarning>{createUser.mailAddress}</p>
        <Button variant="contained" onClick={onClickAdd} disabled={isDisabled}>
          追加する
        </Button>
        <Button variant="contained" onClick={onClickModify} disabled={isDisabled}>
          修正する
        </Button>
      </div>
    )
  );
};

export default UserNewConfirm;
