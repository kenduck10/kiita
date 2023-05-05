import { useRecoilState } from 'recoil';
import { isLoadingState } from '@/stores/load';

export const useLoad = () => {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const startLoad = () => setIsLoading(true);
  return { isLoading, startLoad };
};
