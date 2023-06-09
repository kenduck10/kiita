import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { PAGE_PATH } from '@/utils/consts/route';
import { FRONTEND_API_PATH_BUILDER } from '@/utils/consts/api';

export const useCommentDelete = (commentId: number, onSuccess: () => void) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const doDelete = async () => {
    setIsDeleting(true);
    await axios
      .delete(FRONTEND_API_PATH_BUILDER.COMMENT(commentId))
      .then(onSuccess)
      .catch(async () => {
        await router.push(PAGE_PATH.ERROR);
      })
      .finally(() => setIsDeleting(false));
  };

  return { doDelete, isDeleting, errorMessage };
};
