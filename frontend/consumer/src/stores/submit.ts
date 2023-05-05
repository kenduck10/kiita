import { atom } from 'recoil';

export const isSubmittingState = atom({
  key: 'isSubmitting',
  default: false,
});
