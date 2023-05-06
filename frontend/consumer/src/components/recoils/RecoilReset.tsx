import { ReactElement, useEffect } from 'react';
import { Router } from 'next/router';
import { useResetRecoilState } from 'recoil';
import { isSubmittingState } from '@/stores/submit';
import { isLoadingState } from '@/stores/load';

export const RecoilReset = ({ children, router }: { children: ReactElement; router: Router }) => {
  const resetIsSubmitting = useResetRecoilState(isSubmittingState);
  const resetIsLoading = useResetRecoilState(isLoadingState);
  useEffect(() => {
    resetIsSubmitting();
    resetIsLoading();
  }, [router.pathname]);
  return <>{children}</>;
};
