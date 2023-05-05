import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Button } from '@mui/material';
import { ControlledTextField } from '@/components/elements/ControlledTextField';
import { FIRST_NAME_YUP_SCHEMA, LAST_NAME_YUP_SCHEMA } from '@/features/user/validations/YupSchema';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { createUserErrorMessageState, createUserState } from '@/stores/user';

type SubmitArguments = {
  lastName: string;
  firstName: string;
};

const errorSchema = yup.object().shape({
  lastName: LAST_NAME_YUP_SCHEMA,
  firstName: FIRST_NAME_YUP_SCHEMA,
});

export const UserNew = () => {
  const router = useRouter();
  const [createUser, setCreateUser] = useRecoilState(createUserState);
  const createUserErrorMessage = useRecoilValue(createUserErrorMessageState);
  const resetCreateUserErrorMessage = useResetRecoilState(createUserErrorMessageState);

  const { control, handleSubmit } = useForm<SubmitArguments>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      lastName: createUser.lastName,
      firstName: createUser.firstName,
    },
    resolver: yupResolver(errorSchema),
  });
  const onClickToHome = async () => {
    await router.push(`/`);
    resetCreateUserErrorMessage();
  };
  const confirmPageUrl = '/users/new/confirm';
  const onClickToConfirm: SubmitHandler<SubmitArguments> = async (data) => {
    setCreateUser({ lastName: data.lastName, firstName: data.firstName });
    await router.push({ pathname: confirmPageUrl, query: data }, confirmPageUrl);
    resetCreateUserErrorMessage();
  };

  return (
    <div>
      {createUserErrorMessage && <Alert severity="error">{createUserErrorMessage}</Alert>}
      <ControlledTextField control={control} name={'lastName'} type={'text'} label={'姓'} />
      <ControlledTextField control={control} name={'firstName'} type={'text'} label={'名'} />
      <Button variant="contained" onClick={handleSubmit(onClickToConfirm)}>
        確認画面へ進む
      </Button>
      <Button variant="contained" color="secondary" onClick={onClickToHome}>
        ホームへ戻る
      </Button>
    </div>
  );
};

export default UserNew;
