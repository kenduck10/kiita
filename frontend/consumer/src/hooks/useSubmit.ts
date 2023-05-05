import { useRecoilState } from 'recoil';
import { isSubmittingState } from '@/stores/submit';

export const useSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useRecoilState(isSubmittingState);
  const startSubmit = () => setIsSubmitting(true);
  return { isSubmitting, startSubmit };
};
