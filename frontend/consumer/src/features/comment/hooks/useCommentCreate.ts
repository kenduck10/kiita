import { useState } from 'react';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import { PAGE_PATH } from '@/utils/consts/route';
import { FRONTEND_API_PATH_BUILDER } from '@/utils/consts/api';

export type CommentCreateBody = {
  body: string;
};
export const useCommentCreate = (postId: number, onSuccess: () => void, onError: (errorMessage: string) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const doCreate = async (body: CommentCreateBody) => {
    setIsLoading(true);
    await axios
      .post(FRONTEND_API_PATH_BUILDER.POST_COMMENTS(postId), body)
      .then(onSuccess)
      .catch(async (error: AxiosError) => {
        const expectedStatuses = [HttpStatusCode.BadRequest];
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
