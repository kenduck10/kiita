import { GetServerSideProps } from 'next';
import { Card, Grid } from '@mui/material';
import React from 'react';
import { buildServerSideRedirect } from '@/utils/functions/route';
import { PAGE_PATH } from '@/utils/consts/route';
import { fetchPost } from '@/features/post/utils/functions/ssr';
import Post from '@/features/post/models/Post';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PostHeader } from '@/components/organisms/PostHeader';

export const PostDetail = ({ post }: { post: Post }) => {
  // const router = useRouter();
  // const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  // const { doDelete, isLoading, errorMessage } = useUserDelete(Number(post.id), async () => await router.push('/'));
  //
  // const onClickEditButton = async () => {
  //   await router.push(PAGE_PATH_BUILDER.POST_EDIT(Number(post.id)));
  // };
  // const onClickDeleteButton = async () => {
  //   setIsOpenDeleteDialog(true);
  // };
  //
  // const onClickDeleteAgreement = () => {
  //   doDelete().then(() => setIsOpenDeleteDialog(false));
  // };
  //
  // const onClickDeleteCancel = () => {
  //   setIsOpenDeleteDialog(false);
  // };
  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={8}>
        <Card variant={'outlined'} sx={{ p: 4, border: 0 }}>
          <PostHeader post={post} sx={{ mb: 6 }} />
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
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
