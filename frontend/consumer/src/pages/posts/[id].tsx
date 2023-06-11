import { GetServerSideProps } from 'next';
import { Box, Button, Card, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { buildServerSideRedirect } from '@/utils/functions/route';
import { PAGE_PATH, PAGE_PATH_BUILDER } from '@/utils/consts/route';
import { fetchPost } from '@/features/post/utils/functions/ssr';
import Post from '@/features/post/models/Post';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PostHeader } from '@/components/organisms/PostHeader';
import { usePostDelete } from '@/features/post/hooks/usePostDelete';
import { useRouter } from 'next/router';
import { SelectDialog } from '@/components/molecules/SelectDialog';
import axios, { AxiosResponse } from 'axios';
import { FRONTEND_API_PATH_BUILDER } from '@/utils/consts/api';
import Comments from '@/features/comment/models/Comments';
import { GetCommentsResponse } from '@/pages/api/posts/[id]/comments';
import { PostComments } from '@/components/organisms/PostComments';
import { PostCommentHeader } from '@/components/organisms/PostCommentHeader';
import { ControlledTextareaAutosize } from '@/components/molecules/ControlledTextareaAutosize';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CommentCreateBody, useCommentCreate } from '@/features/comment/hooks/useCommentCreate';
import * as yup from 'yup';
import { BODY_YUP_SCHEMA } from '@/features/comment/validations/YupSchema';

const errorSchema = yup.object().shape({
  body: BODY_YUP_SCHEMA,
});

export const PostDetail = ({ post }: { post: Post }) => {
  const router = useRouter();
  const postId = Number(post.id);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const { doDelete, isLoading, errorMessage } = usePostDelete(postId, async () => await router.push(PAGE_PATH.HOME));
  const [comments, setComments] = useState<Comments>();
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const { control, handleSubmit, reset, getValues } = useForm<CommentCreateBody>({
    mode: 'all',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: {
      body: '',
    },
    // resolver: yupResolver(errorSchema),
  });
  const { doCreate, isCreating: isCreatingComment } = useCommentCreate(
    postId,
    async () => {
      await fetchComments();
      reset();
    },
    (errorMessage: string) => {
      // setErrorMessage(errorMessage);
    }
  );

  const onClickEditButton = async () => {
    await router.push(PAGE_PATH_BUILDER.POST_EDIT(postId));
  };
  const onClickDeleteButton = async () => {
    setIsOpenDeleteDialog(true);
  };

  const onClickDeleteAgreement = () => {
    doDelete().then(() => setIsOpenDeleteDialog(false));
  };

  const onClickDeleteCancel = () => {
    setIsOpenDeleteDialog(false);
  };

  const fetchComments = async () => {
    await axios
      .get(FRONTEND_API_PATH_BUILDER.POST_COMMENTS(postId))
      .then((response: AxiosResponse<GetCommentsResponse>) => {
        setComments(new Comments(response.data));
      });
  };

  useEffect(() => {
    setIsLoadingComments(true);
    fetchComments().then(() => setIsLoadingComments(false));
  }, []);

  const onClickPost: SubmitHandler<CommentCreateBody> = async (createComment) => {
    await doCreate(createComment);
  };

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={8}>
        <Card variant={'outlined'} sx={{ p: 4, border: 0 }}>
          <Box mb={2} display={'flex'} justifyContent={'flex-end'}>
            <Button variant="contained" color="primary" onClick={onClickEditButton} disabled={isLoading} sx={{ mr: 2 }}>
              編集
            </Button>
            <Button variant="contained" color="error" onClick={onClickDeleteButton} disabled={isLoading}>
              削除
            </Button>
          </Box>
          <PostHeader post={post} sx={{ mb: 2 }} />
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          <SelectDialog
            open={isOpenDeleteDialog}
            onClose={() => setIsOpenDeleteDialog(false)}
            dialogTitle={'本当に削除しますか？'}
            dialogContentText={'削除した記事は元に戻すことができません'}
            dialogButtons={[
              { action: onClickDeleteCancel, label: 'キャンセル', color: 'secondary' },
              { action: onClickDeleteAgreement, label: '削除', color: 'error' },
            ]}
            isLoading={isLoading}
          />
        </Card>
        <Card variant={'outlined'} sx={{ p: 4, border: 0, mt: 3 }}>
          <PostCommentHeader />
          {isLoadingComments || comments === undefined ? (
            <Box display={'flex'} justifyContent={'center'} mt={3}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <PostComments comments={comments} sx={{ mt: 3 }} onDeleteComment={fetchComments} />
              <Box>
                <Typography variant={'h6'} sx={{ fontWeight: 'bold', mt: 3 }} textAlign={'left'}>
                  コメントする
                </Typography>
                <Box mt={1}>
                  <ControlledTextareaAutosize control={control} name={'body'} minRows={10} style={{ width: '100%' }} />
                </Box>
                <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant={'contained'}
                    color={'primary'}
                    onClick={handleSubmit(onClickPost)}
                    sx={{ boxShadow: 'none' }}
                    disabled={isCreatingComment}
                  >
                    追加する
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Card>
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

export default PostDetail;
