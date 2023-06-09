import { useState } from 'react';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import { PAGE_PATH } from '@/utils/consts/route';
import { FRONTEND_API_PATH } from '@/utils/consts/api';

export type PostCreateBody = {
  title: string;
  body: string;
  isDraft: boolean;
};

/**
 * 記事作成用hook
 * @param onSuccess 作成成功時の処理
 * @param onError 作成失敗時の処理
 */
export const usePostCreate = (onSuccess: () => void, onError: (errorMessage: string) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const doCreate = async (body: PostCreateBody) => {
    setIsLoading(true);
    await axios
      .post(FRONTEND_API_PATH.POSTS, body)
      .then(onSuccess)
      .catch(async (error: AxiosError) => {
        const expectedStatuses = [HttpStatusCode.BadRequest, HttpStatusCode.Forbidden];
        const actualStatus = error.response?.status;
        if (!actualStatus || !expectedStatuses.includes(actualStatus)) {
          await router.push(PAGE_PATH.ERROR);
          return;
        }

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
