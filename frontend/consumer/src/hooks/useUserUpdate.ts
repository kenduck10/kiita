import { useState } from 'react';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';

export type UserUpdateBody = {
  lastName: string;
  firstName: string;
  mailAddress: string;
};
export const useUserUpdate = (userId: number, onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const doUpdate = async (body: UserUpdateBody) => {
    setIsLoading(true);
    await axios
      .put(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users/${userId}`, body)
      .then(onSuccess)
      .catch(async (error: AxiosError) => {
        const expectedStatuses = [HttpStatusCode.BadRequest, HttpStatusCode.NotFound, HttpStatusCode.Conflict];
        const actualStatus = error.response?.status;
        if (!actualStatus || !expectedStatuses.includes(actualStatus)) {
          await router.push('/error');
          return;
        }

        if (actualStatus === HttpStatusCode.BadRequest) {
          setErrorMessage('入力内容に誤りがあります');
          return;
        }
        if (actualStatus === HttpStatusCode.NotFound) {
          setErrorMessage('このユーザーは既に削除されています');
          return;
        }
        if (actualStatus === HttpStatusCode.Conflict) {
          setErrorMessage('指定のメールアドレスは既に利用されています');
          return;
        }
      })
      .finally(() => setIsLoading(false));
  };
  return { doUpdate, isLoading, errorMessage };
};
