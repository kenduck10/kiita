import { useState } from 'react';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import { PAGE_PATH } from '@/utils/consts/route';
import { FRONTEND_API_PATH } from '@/utils/consts/api';
import { useSession } from 'next-auth/react';

export type PostCreateBody = {
  title: string;
  body: string;
};
export const usePostCreate = (onSuccess: () => void, onError: (errorMessage: string) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { data } = useSession();

  const doCreate = async (body: PostCreateBody) => {
    setIsLoading(true);
    await axios
      .post(FRONTEND_API_PATH.POSTS, body, { headers: { 'X-Auth-Token': data?.user.accessToken } })
      .then(onSuccess)
      .catch(async (error: AxiosError) => {
        const expectedStatuses = [HttpStatusCode.BadRequest, HttpStatusCode.Forbidden];
        const actualStatus = error.response?.status;
        if (!actualStatus || !expectedStatuses.includes(actualStatus)) {
          await router.push(PAGE_PATH.ERROR);
          return;
        }

        // if (actualStatus === HttpStatusCode.Forbidden) {
        //   await signOut();
        //   return;
        // }

        let errorMessage = '';
        if (actualStatus === HttpStatusCode.BadRequest) {
          errorMessage = '入力内容に誤りがあります';
        }
        setErrorMessage(errorMessage);
        onError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  return { doCreate, isLoading, errorMessage };
};
