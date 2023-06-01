import { Box, Button, Grid, TextareaAutosize } from '@mui/material';
import React, { useState } from 'react';
import { ControlledTextField } from '@/components/molecules/ControlledTextField';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PostCreateBody } from '@/hooks/usePostCreate';
import { yupResolver } from '@hookform/resolvers/yup';
import { TITLE_YUP_SCHEMA } from '@/features/post/validations/YupSchema';
import * as yup from 'yup';

const errorSchema = yup.object().shape({
  title: TITLE_YUP_SCHEMA,
});

type SubmitArguments = {
  title: string;
  body: string;
};

export const PostNew = () => {
  // const router = useRouter();
  //
  const [isLoading, setIsLoading] = useState(false);
  //
  // const [createUser, setCreateUser] = useRecoilState(createUserState);
  // const createUserErrorMessage = useRecoilValue(createUserErrorMessageState);
  //
  // const resetCreateUser = useResetRecoilState(createUserState);
  // const resetCreateUserErrorMessage = useResetRecoilState(createUserErrorMessageState);
  //
  const { control, handleSubmit, reset } = useForm<PostCreateBody>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      title: '',
      body: '',
    },
    resolver: yupResolver(errorSchema),
  });

  // useEffect(() => {
  //   if (isFromConfirm) {
  //     reset(createUser);
  //     return;
  //   }
  //   resetCreateUser();
  //   resetCreateUserErrorMessage();
  // }, []);
  //
  // const onClickCancel = async () => await router.push(PAGE_PATH.HOME);
  const onClickPost: SubmitHandler<PostCreateBody> = async (createPost) => {
    console.log(createPost);
    // setIsLoading(true);
    // setCreateUser(createUser);
    // await router.push(PAGE_PATH.USER_NEW_CONFIRM);
    // resetCreateUserErrorMessage();
  };

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={12}>
        <ControlledTextField
          control={control}
          name={'title'}
          type={'text'}
          disabled={isLoading}
          label={'タイトル'}
          fullWidth={true}
          id={'title-field'}
        />
        <Box mt={3}>
          <Controller
            control={control}
            name={'body'}
            render={({ field, fieldState }) => (
              <TextareaAutosize {...field} minRows={30} style={{ width: '100%' }}></TextareaAutosize>
            )}
          />
        </Box>
        <Button onClick={handleSubmit(onClickPost)}>Kiitaに投稿する</Button>
        {/*<Card sx={{ p: 4 }}>*/}
        {/*  <MainContentHeader title={'ユーザー追加'} sx={{ mb: 2 }} />*/}
        {/*  {createUserErrorMessage && (*/}
        {/*    <Alert severity="error" sx={{ mb: 2 }}>*/}
        {/*      {createUserErrorMessage}*/}
        {/*    </Alert>*/}
        {/*  )}*/}
        {/*  <UserItemsForm control={control} isLoading={isLoading} />*/}
        {/*  <Button*/}
        {/*    id={'confirm-button'}*/}
        {/*    variant="contained"*/}
        {/*    color="primary"*/}
        {/*    onClick={handleSubmit(onClickToConfirm)}*/}
        {/*    sx={{ mr: 2 }}*/}
        {/*  >*/}
        {/*    確認*/}
        {/*  </Button>*/}
        {/*  <Button*/}
        {/*    id={'cancel-button'}*/}
        {/*    variant="contained"*/}
        {/*    color="secondary"*/}
        {/*    onClick={onClickCancel}*/}
        {/*    sx={{ color: 'white' }}*/}
        {/*  >*/}
        {/*    キャンセル*/}
        {/*  </Button>*/}
        {/*</Card>*/}
      </Grid>
    </Grid>
  );
};

export default PostNew;

// export const getServerSideProps = (context: GetServerSidePropsContext) => {
//   const referer = context.req.headers.referer;
//   return {
//     props: {
//       isFromConfirm: referer === process.env.NEXT_PUBLIC_KIITA_FRONTEND_BASE_URL + PAGE_PATH.USER_NEW_CONFIRM,
//     },
//   };
// };
