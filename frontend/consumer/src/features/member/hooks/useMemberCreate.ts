import { useState } from 'react';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import { PAGE_PATH } from '@/utils/consts/route';
import { FRONTEND_API_PATH } from '@/utils/consts/api';

export type MemberCreateBody = {
  name: string;
  mailAddress: string;
  password: string;
};
export const useMemberCreate = (onSuccess: () => void, onError: (errorMessage: string) => void) => {
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const doCreate = async (body: MemberCreateBody) => {
    setIsCreating(true);
    await axios
      .post(FRONTEND_API_PATH.MEMBERS, body)
      .then(onSuccess)
      .catch(async (error: AxiosError) => {
        const expectedStatuses = [HttpStatusCode.BadRequest, HttpStatusCode.Conflict];
        const actualStatus = error.response?.status;
        if (!actualStatus || !expectedStatuses.includes(actualStatus)) {
          await router.push(PAGE_PATH.ERROR);
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
      .finally(() => setIsCreating(false));
  };

  return { doCreate, isCreating, errorMessage };
};
