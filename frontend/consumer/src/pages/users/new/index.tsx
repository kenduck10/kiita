import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Button } from '@mui/material';
import { ControlledTextField } from '@/components/elements/ControlledTextField';
import {
  FIRST_NAME_YUP_SCHEMA,
  LAST_NAME_YUP_SCHEMA,
  MAIL_ADDRESS_YUP_SCHEMA,
} from '@/features/user/validations/YupSchema';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { createUserErrorMessageState, createUserState } from '@/stores/user';
import { useLoad } from '@/hooks/useLoad';

type SubmitArguments = {
  lastName: string;
  firstName: string;
  mailAddress: string;
};

const errorSchema = yup.object().shape({
  lastName: LAST_NAME_YUP_SCHEMA,
  firstName: FIRST_NAME_YUP_SCHEMA,
  mailAddress: MAIL_ADDRESS_YUP_SCHEMA,
});

export const UserNew = () => {
  const router = useRouter();
  const [createUser, setCreateUser] = useRecoilState(createUserState);
  const createUserErrorMessage = useRecoilValue(createUserErrorMessageState);
  const resetCreateUserErrorMessage = useResetRecoilState(createUserErrorMessageState);
  const { isLoading, startLoad } = useLoad();

  const { control, handleSubmit } = useForm<SubmitArguments>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      lastName: createUser.lastName,
      firstName: createUser.firstName,
      mailAddress: createUser.mailAddress,
    },
    resolver: yupResolver(errorSchema),
  });
  const onClickToHome = async () => {
    startLoad();
    await router.push(`/`);
    resetCreateUserErrorMessage();
  };

  const confirmPageUrl = '/users/new/confirm';
  const onClickToConfirm: SubmitHandler<SubmitArguments> = async (data) => {
    startLoad();
    setCreateUser({ lastName: data.lastName, firstName: data.firstName, mailAddress: data.mailAddress });
    await router.push({ pathname: confirmPageUrl, query: data }, confirmPageUrl);
    resetCreateUserErrorMessage();
  };

  return (
    <div>
      {createUserErrorMessage && <Alert severity="error">{createUserErrorMessage}</Alert>}
      <ControlledTextField control={control} name={'lastName'} type={'text'} label={'姓'} disabled={isLoading} />
      <ControlledTextField control={control} name={'firstName'} type={'text'} label={'名'} disabled={isLoading} />
      <ControlledTextField
        control={control}
        name={'mailAddress'}
        type={'email'}
        label={'メールアドレス'}
        disabled={isLoading}
      />
      <Button variant="contained" onClick={handleSubmit(onClickToConfirm)} disabled={isLoading}>
        確認画面へ進む
      </Button>
      <Button variant="contained" color="secondary" onClick={onClickToHome} disabled={isLoading}>
        ホームへ戻る
      </Button>
    </div>
  );
};

export default UserNew;
