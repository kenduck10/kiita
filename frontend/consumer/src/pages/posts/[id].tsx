import { GetServerSideProps } from 'next';
import { Box, Button, Card, Grid } from '@mui/material';
import React, { useState } from 'react';
import { buildServerSideRedirect } from '@/utils/functions/route';
import { PAGE_PATH } from '@/utils/consts/route';
import { fetchPost } from '@/features/post/utils/functions/ssr';
import Post from '@/features/post/models/Post';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PostHeader } from '@/components/organisms/PostHeader';
import { usePostDelete } from '@/hooks/usePostDelete';
import { useRouter } from 'next/router';
import { SelectDialog } from '@/components/molecules/SelectDialog';

export const PostDetail = ({ post }: { post: Post }) => {
  const router = useRouter();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const { doDelete, isLoading, errorMessage } = usePostDelete(
    Number(post.id),
    async () => await router.push(PAGE_PATH.HOME)
  );
  //
  // const onClickEditButton = async () => {
  //   await router.push(PAGE_PATH_BUILDER.POST_EDIT(Number(post.id)));
  // };
  const onClickDeleteButton = async () => {
    setIsOpenDeleteDialog(true);
  };
  //
  const onClickDeleteAgreement = () => {
    doDelete().then(() => setIsOpenDeleteDialog(false));
  };

  const onClickDeleteCancel = () => {
    setIsOpenDeleteDialog(false);
  };
  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={8}>
        <Card variant={'outlined'} sx={{ p: 4, border: 0 }}>
          <Box mb={2} display={'flex'} justifyContent={'flex-end'}>
            <Button
              variant="contained"
              color="primary"
              // onClick={onClickEditButton}
              // disabled={isLoading}
              sx={{ mr: 2 }}
            >
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
