import React from 'react';
import PostSummaries from '@/features/post/models/PostSummaries';
import { PostSummaryCard } from '@/components/organisms/PostSummaryCard';

export const PostSummaryCardList = ({ postSummaries }: { postSummaries: PostSummaries }) => {
  const length = postSummaries.value.length;
  return (
    <>
      {postSummaries.value.map((postSummary, index) => {
        return (
          <PostSummaryCard postSummary={postSummary} key={postSummary.id} sx={{ mb: index === length - 1 ? 0 : 3 }} />
        );
      })}
    </>
  );
};
