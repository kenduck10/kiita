import { GetServerSideProps } from 'next';
import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { buildServerSideRedirect } from '@/utils/functions/route';
import { PAGE_PATH } from '@/utils/consts/route';
import { fetchPost } from '@/features/post/utils/functions/ssr';
import Post from '@/features/post/models/Post';

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
          <Box sx={{ mb: 2 }}>
            <Typography id={'post-title'} variant={'h5'} sx={{ fontWeight: 'bold', mb: 4 }} textAlign={'left'}>
              {post.title}
            </Typography>
          </Box>
          {/*  <MainContentHeader title={'ユーザー詳細'} sx={{ mb: 2 }} />*/}
          {/*  {errorMessage && (*/}
          {/*    <Alert severity="error" sx={{ mb: 2 }}>*/}
          {/*      {errorMessage}*/}
          {/*    </Alert>*/}
          {/*  )}*/}
          {/*  <Box mb={2} display={'flex'} justifyContent={'space-between'}>*/}
          {/*    <Box>*/}
          {/*      <Button*/}
          {/*        variant="contained"*/}
          {/*        color="primary"*/}
          {/*        onClick={onClickEditButton}*/}
          {/*        disabled={isLoading}*/}
          {/*        sx={{ mr: 2 }}*/}
          {/*      >*/}
          {/*        編集*/}
          {/*      </Button>*/}
          {/*      <Button variant="contained" color="error" onClick={onClickDeleteButton} disabled={isLoading}>*/}
          {/*        削除*/}
          {/*      </Button>*/}
          {/*    </Box>*/}
          {/*    <Link href={'/'}>一覧へ</Link>*/}
          {/*  </Box>*/}
          {/*  <UserItems user={user} />*/}
          {/*  <SelectDialog*/}
          {/*    open={isOpenDeleteDialog}*/}
          {/*    onClose={() => setIsOpenDeleteDialog(false)}*/}
          {/*    dialogTitle={'本当に削除しますか？'}*/}
          {/*    dialogContentText={'削除したユーザーは元に戻すことができません'}*/}
          {/*    dialogButtons={[*/}
          {/*      { action: onClickDeleteCancel, label: 'キャンセル', color: 'secondary' },*/}
          {/*      { action: onClickDeleteAgreement, label: '削除', color: 'error' },*/}
          {/*    ]}*/}
          {/*    isLoading={isLoading}*/}
          {/*  />*/}
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
