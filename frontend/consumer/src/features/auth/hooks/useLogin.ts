import { useState } from 'react';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import { PAGE_PATH } from '@/utils/consts/route';
import { FRONTEND_API_PATH } from '@/utils/consts/api';

export type LoginBody = {
  name: string;
  password: string;
};
export const useLogin = (onSuccess: () => void, onError: (errorMessage: string) => void) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const doLogin = async (body: LoginBody) => {
    setIsLoggingIn(true);
    await axios
      .post(FRONTEND_API_PATH.LOGIN, body)
      .then(onSuccess)
      .catch(async (error: AxiosError) => {
        const expectedStatuses = [HttpStatusCode.Unauthorized];
        const actualStatus = error.response?.status;
        if (!actualStatus || !expectedStatuses.includes(actualStatus)) {
          await router.push(PAGE_PATH.ERROR);
          return;
        }

        let errorMessage = '';
        if (actualStatus === HttpStatusCode.Unauthorized) {
          errorMessage = 'ユーザー名またはパスワードに誤りがあります';
        }
        setErrorMessage(errorMessage);
        onError(errorMessage);
      })
      .finally(() => setIsLoggingIn(false));
  };

  return { doLogin, isLoggingIn, errorMessage };
};
