import { useState } from 'react';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import { PAGE_PATH } from '@/utils/consts/route';
import { FRONTEND_API_PATH_BUILDER } from '@/utils/consts/api';

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
      .put(FRONTEND_API_PATH_BUILDER.USER(userId), body)
      .then(onSuccess)
      .catch(async (error: AxiosError) => {
        const expectedStatuses = [HttpStatusCode.BadRequest, HttpStatusCode.NotFound, HttpStatusCode.Conflict];
        const actualStatus = error.response?.status;
        if (!actualStatus || !expectedStatuses.includes(actualStatus)) {
          await router.push(PAGE_PATH.ERROR);
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
