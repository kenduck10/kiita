import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { PAGE_PATH } from '@/utils/consts/route';
import { HttpStatusCode } from 'axios';

export type LoginBody = {
  name: string;
  password: string;
};
export const useLogin = (onSuccess: () => void, onError: (errorMessage: string) => void) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const doLogin = async (body: LoginBody) => {
    setIsLoggingIn(true);
    await signIn('credentials', {
      redirect: false,
      username: body.name,
      password: body.password,
    })
      .then(async (response) => {
        if (!response) {
          await router.push(PAGE_PATH.ERROR);
          return;
        }
        const status = response.status;
        if (status === HttpStatusCode.Ok) {
          onSuccess();
          return;
        }
        if (status === HttpStatusCode.Unauthorized) {
          onError('ユーザー名またはパスワードに誤りがあります');
          return;
        }
        await router.push(PAGE_PATH.ERROR);
      })
      .catch(async () => await router.push(PAGE_PATH.ERROR))
      .finally(() => setIsLoggingIn(false));
  };

  return { doLogin, isLoggingIn };
};
