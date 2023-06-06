import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

export const PostCommentHeader = () => {
  return (
    <Box>
      <Typography variant={'h5'} sx={{ fontWeight: 'bold', mb: 3 }} textAlign={'left'}>
        コメント
      </Typography>
      <Divider />
    </Box>
  );
};
