import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
export const createUserState = atom({
  key: 'createUser',
  default: {
    lastName: '',
    firstName: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const createUserErrorMessageState = atom({
  key: 'createUserErrorMessage',
  default: '',
});
