import { useState } from 'react';
import axios, { HttpStatusCode } from 'axios';
import { useRouter } from 'next/router';
import { PAGE_PATH } from '@/utils/consts/route';

export const useUserDelete = (userId: number, onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const doDelete = async () => {
    setIsLoading(true);
    await axios
      .delete(`${process.env.NEXT_PUBLIC_KIITA_FRONTEND_API_BASE_URL}users/${userId}`)
      .then(onSuccess)
      .catch(async (error) => {
        if (error.response.status === HttpStatusCode.NotFound) {
          setErrorMessage('このユーザーは既に削除されています');
          return;
        }
        await router.push(PAGE_PATH.ERROR);
      })
      .finally(() => setIsLoading(false));
  };

  return { doDelete, isLoading, errorMessage };
};
