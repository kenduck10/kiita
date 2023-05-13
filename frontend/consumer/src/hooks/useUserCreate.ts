import { useState } from 'react';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';

export type UserCreateBody = {
  lastName: string;
  firstName: string;
  mailAddress: string;
};
export const useUserCreate = (onSuccess: () => void, onError: (errorMessage: string) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const doCreate = async (body: UserCreateBody) => {
    setIsLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users`, body)
      .then(onSuccess)
      .catch(async (error: AxiosError) => {
        const expectedStatuses = [HttpStatusCode.BadRequest, HttpStatusCode.Conflict];
        const actualStatus = error.response?.status;
        if (!actualStatus || !expectedStatuses.includes(actualStatus)) {
          await router.push('/error');
          return;
        }

        let errorMessage = '';
        if (actualStatus === HttpStatusCode.BadRequest) {
          errorMessage = '入力内容に誤りがあります';
        }
        if (actualStatus === HttpStatusCode.Conflict) {
          errorMessage = '指定のメールアドレスは既に利用されています';
        }
        setErrorMessage(errorMessage);
        onError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  return { doCreate, isLoading, errorMessage };
};
