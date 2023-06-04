import { GetServerSideProps } from 'next';
import { Box, Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { buildServerSideRedirect } from '@/utils/functions/route';
import { PAGE_PATH, PAGE_PATH_BUILDER } from '@/utils/consts/route';
import { fetchPost } from '@/features/post/utils/functions/ssr';
import { TITLE_YUP_SCHEMA } from '@/features/post/validations/YupSchema';
import Post from '@/features/post/models/Post';
import { PostUpdateBody, usePostUpdate } from '@/hooks/usePostUpdate';
import { PostItemsForm } from '@/components/organisms/PostItemsForm';

const errorSchema = yup.object().shape({
  title: TITLE_YUP_SCHEMA,
});

export const PostEdit = ({ post }: { post: Post }) => {
  const router = useRouter();
  const postId = Number(post.id);
  const { doUpdate, isLoading, errorMessage } = usePostUpdate(
    postId,
    async () => await router.push(PAGE_PATH_BUILDER.POST_DETAIL(postId))
  );

  const { control, handleSubmit, reset } = useForm<PostUpdateBody>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      title: post.title,
      body: post.body,
    },
    resolver: yupResolver(errorSchema),
  });

  const onClickCancel = async () => await router.push(PAGE_PATH_BUILDER.POST_DETAIL(postId));

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={12}>
        <PostItemsForm control={control} isLoading={isLoading} />
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit(doUpdate)} sx={{ mr: 2 }}>
            更新
          </Button>
          <Button variant="contained" color="secondary" onClick={onClickCancel} sx={{ color: 'white' }}>
            キャンセル
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postId = context.params?.id;
  if (postId === undefined) {
    return buildServerSideRedirect(PAGE_PATH.ERROR);
  }
  return fetchPost(Number(postId));
};

export default PostEdit;
