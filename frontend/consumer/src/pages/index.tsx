import { Grid } from '@mui/material';
import { NextPageWithLayout } from '@/pages/_app';
import Layout from '@/components/layouts/Layout';
import { useRouter } from 'next/router';
import React from 'react';
import { fetchPostSummaries } from '@/features/post/utils/functions/ssr';
import PostSummaries from '@/features/post/models/PostSummaries';
import { PostSummaryCard } from '@/components/organisms/PostSummaryCard';

export const Home: NextPageWithLayout<{ postSummaries: PostSummaries }> = ({
  postSummaries,
}: {
  postSummaries: PostSummaries;
}) => {
  const router = useRouter();
  console.log(postSummaries);

  // const onClickToAdd = async () => {
  //   await router.push(PAGE_PATH.USER_NEW);
  // };

  // const tableHeads: { key: keyof UserSummary; name: string }[] = [
  //   { key: 'id', name: 'ID' },
  //   { key: 'lastName', name: '姓' },
  //   {
  //     key: 'firstName',
  //     name: '名',
  //   },
  //   { key: 'mailAddress', name: 'メールアドレス' },
  // ];

  return (
    <Grid container justifyContent={'center'}>
      <Grid item xs={12} md={6}>
        {postSummaries.value.map((postSummary) => {
          return <PostSummaryCard postSummary={postSummary} key={postSummary.id} />;
        })}
        {/*<Card sx={{ p: 4 }}>*/}
        {/*  <MainContentHeader title={'ユーザー一覧'} sx={{ mb: 2 }} />*/}
        {/*  <Button id={'add-user-button'} variant="contained" color="primary" onClick={onClickToAdd} sx={{ mb: 2 }}>*/}
        {/*    追加*/}
        {/*  </Button>*/}
        {/*  <LinkTable*/}
        {/*    tableHeads={tableHeads}*/}
        {/*    rows={userSummaries.value}*/}
        {/*    rowsPerPage={5}*/}
        {/*    router={router}*/}
        {/*    link={PAGE_PATH_BUILDER.USER_DETAIL}*/}
        {/*  />*/}
        {/*</Card>*/}
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = async () => {
  return fetchPostSummaries();
  // return fetchUserSummaries();
};

Home.getLayout = (page, router) => {
  return <Layout>{page}</Layout>;
};
export default Home;
