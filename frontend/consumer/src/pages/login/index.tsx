import {Alert, Button, Card, Grid, Typography} from '@mui/material';
import {NextPageWithLayout} from '@/pages/_app';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ControlledTextField} from '@/components/molecules/ControlledTextField';
import {LoginBody, useLogin} from '@/features/auth/hooks/useLogin';
import {PAGE_PATH} from '@/utils/consts/route';

/**
 * ログイン画面
 */
export const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { doLogin, isLoggingIn } = useLogin(
    async () => {
      await router.push(PAGE_PATH.HOME);
    },
    (errorMessage) => {
      setErrorMessage(errorMessage);
    }
  );
  const { control, handleSubmit, reset } = useForm<LoginBody>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      name: '',
      password: '',
    },
  });

  const onClickLogin: SubmitHandler<LoginBody> = async (loginBody) => {
    setErrorMessage('');
    await doLogin(loginBody);
  };

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={4}>
        <Card variant={'outlined'} sx={{ p: 4, border: 0 }}>
          <Typography id={'main-content-title'} variant={'h5'} sx={{ fontWeight: 'bold' }} textAlign={'center'}>
            {'ログイン'}
          </Typography>
          {errorMessage && (
            <Alert severity="error" sx={{ my: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <ControlledTextField
            control={control}
            name={'name'}
            type={'text'}
            disabled={isLoggingIn}
            label={'ユーザー名'}
            fullWidth={true}
            id={'name-field'}
            sx={{ mt: 2 }}
          />
          <ControlledTextField
            control={control}
            name={'password'}
            type={'password'}
            disabled={isLoggingIn}
            label={'パスワード'}
            fullWidth={true}
            id={'password-field'}
            sx={{ mt: 2 }}
          />
          <Button
            onClick={handleSubmit(onClickLogin)}
            id={'login-button'}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
            disabled={isLoggingIn}
          >
            ログイン
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
