import { Box, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import Post from '@/features/post/models/Post';

export const PostHeader = ({ post, sx }: { post: Post; sx?: SxProps<Theme> }) => {
  return (
    <Box sx={sx}>
      <Typography id={'post-title'} variant={'h5'} sx={{ fontWeight: 'bold', mb: 4 }} textAlign={'left'}>
        {post.title}
      </Typography>
    </Box>
  );
};
