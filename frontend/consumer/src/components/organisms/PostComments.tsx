import { Box, CircularProgress, Divider, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import Comments from '@/features/comment/models/Comments';
import { PostComment } from '@/components/organisms/PostComment';

export const PostComments = ({
  comments,
  isLoading,
  sx,
}: {
  comments?: Comments;
  isLoading: boolean;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Box sx={sx}>
      {isLoading || comments === undefined ? (
        <Box display={'flex'} justifyContent={'center'}>
          <CircularProgress />
        </Box>
      ) : (
        buildLoadedCommentsComponent(comments)
      )}
    </Box>
  );
};

const buildLoadedCommentsComponent = (comments: Comments) => {
  const commentsLength = comments.value.length;
  if (commentsLength === 0) {
    return (
      <Box display={'flex'} justifyContent={'center'}>
        <Typography>コメントはありません</Typography>
      </Box>
    );
  }
  return comments.value.map((comment, index) => {
    const isFirst = index === 0;
    const isLast = index === commentsLength - 1;
    return (
      <Box key={comment.commentId} mt={isFirst ? 0 : 3}>
        <PostComment comment={comment} />
        {!isLast && <Divider sx={{ mt: 3 }} />}
      </Box>
    );
  });
};
