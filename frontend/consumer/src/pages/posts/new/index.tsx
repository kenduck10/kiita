import { Box, Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PostCreateBody, usePostCreate } from '@/hooks/usePostCreate';
import { yupResolver } from '@hookform/resolvers/yup';
import { TITLE_YUP_SCHEMA } from '@/features/post/validations/YupSchema';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { PAGE_PATH } from '@/utils/consts/route';
import { PostItemsForm } from '@/components/organisms/PostItemsForm';

const errorSchema = yup.object().shape({
  title: TITLE_YUP_SCHEMA,
});

type SubmitArguments = {
  title: string;
  body: string;
};

export const PostNew = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
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

  const { doCreate, isLoading } = usePostCreate(
    async () => {
      await router.push(PAGE_PATH.HOME);
    },
    (errorMessage: string) => {
      setErrorMessage(errorMessage);
    }
  );

  const onClickPost: SubmitHandler<PostCreateBody> = async (createPost) => {
    await doCreate(createPost);
  };

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={12}>
        <PostItemsForm control={control} isLoading={isLoading} />
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={handleSubmit(onClickPost)}
            sx={{ boxShadow: 'none' }}
          >
            Kiitaに投稿する
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PostNew;
