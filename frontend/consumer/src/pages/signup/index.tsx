import {Button, Card, Grid, Typography} from '@mui/material';
import {NextPageWithLayout} from '@/pages/_app';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {MemberCreateBody, useMemberCreate} from '@/features/member/hooks/useMemberCreate';
import {ControlledTextField} from '@/components/molecules/ControlledTextField';

/**
 * 会員登録画面
 * @constructor
 */
export const Signup: NextPageWithLayout = () => {
  // TODO: 成功、失敗時の処理を追加
  const { doCreate, isCreating, errorMessage } = useMemberCreate(
    () => {
      console.log('success');
    },
    (errorMessage) => {
      console.log(errorMessage);
    }
  );
  const { control, handleSubmit, reset } = useForm<MemberCreateBody>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      name: '',
      mailAddress: '',
      password: '',
    },
    // resolver: yupResolver(errorSchema),
  });

  const onClickRegister: SubmitHandler<MemberCreateBody> = async (createMember) => {
    await doCreate(createMember);
  };

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={4}>
        <Card variant={'outlined'} sx={{ p: 4, border: 0 }}>
          <Typography id={'main-content-title'} variant={'h5'} sx={{ fontWeight: 'bold' }} textAlign={'center'}>
            {'新規登録'}
          </Typography>
          <ControlledTextField
            control={control}
            name={'name'}
            type={'text'}
            disabled={isCreating}
            label={'ユーザー名'}
            fullWidth={true}
            id={'name-field'}
            sx={{ mt: 2 }}
          />
          <ControlledTextField
            control={control}
            name={'mailAddress'}
            type={'email'}
            disabled={isCreating}
            label={'メールアドレス'}
            fullWidth={true}
            id={'mail-address-field'}
            sx={{ mt: 2 }}
          />
          <ControlledTextField
            control={control}
            name={'password'}
            type={'password'}
            disabled={isCreating}
            label={'パスワード'}
            fullWidth={true}
            id={'password-field'}
            sx={{ mt: 2 }}
          />
          <Button
            onClick={handleSubmit(onClickRegister)}
            id={'signup-button'}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
            disabled={isCreating}
          >
            登録する
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;
