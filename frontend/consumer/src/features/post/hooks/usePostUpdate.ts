import { useState } from 'react';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import { PAGE_PATH } from '@/utils/consts/route';
import { FRONTEND_API_PATH_BUILDER } from '@/utils/consts/api';

export type PostUpdateBody = {
  title: string;
  body: string;
  isDraft: boolean;
};
export const usePostUpdate = (postId: number, onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const doUpdate = async (body: PostUpdateBody) => {
    setIsLoading(true);
    await axios
      .patch(FRONTEND_API_PATH_BUILDER.POST(postId), body)
      .then(onSuccess)
      .catch(async (error: AxiosError) => {
        const expectedStatuses = [HttpStatusCode.BadRequest, HttpStatusCode.NotFound];
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
          setErrorMessage('この記事は既に削除されています');
          return;
        }
      })
      .finally(() => setIsLoading(false));
  };
  return { doUpdate, isLoading, errorMessage };
};
