import { Box, Divider, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import Comments from '@/features/comment/models/Comments';
import { PostComment } from '@/components/organisms/PostComment';

export const PostComments = ({
  comments,
  sx,
  onDeleteComment,
}: {
  comments: Comments;
  sx?: SxProps<Theme>;
  onDeleteComment: () => void;
}) => {
  const commentsLength = comments.value.length;
  if (commentsLength === 0) {
    return (
      <Box display={'flex'} justifyContent={'center'} sx={sx}>
        <Typography>コメントはありません</Typography>
      </Box>
    );
  }

  return (
    <Box sx={sx}>
      {comments.value.map((comment, index) => {
        const isFirst = index === 0;
        return (
          <Box key={comment.commentId} mt={isFirst ? 0 : 3}>
            <PostComment comment={comment} onDeleteComment={onDeleteComment} />
            <Divider sx={{ mt: 3 }} />
          </Box>
        );
      })}
    </Box>
  );
};
