import { Box, Button, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import Post from '@/features/post/models/Post';

export const PostHeader = ({
  post,
  sx,
  onClickEditButton,
  onClickDeleteButton,
  isLoading,
}: {
  post: Post;
  sx?: SxProps<Theme>;
  onClickEditButton: () => void;
  onClickDeleteButton: () => void;
  isLoading: boolean;
}) => {
  return (
    <Box sx={sx}>
      <Box mb={2} display={'flex'} justifyContent={'flex-end'}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography>@kenduck</Typography>
          <Typography variant={'inherit'}>投稿日 2020年01月12日 更新日 2022年12月11日</Typography>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={onClickEditButton} disabled={isLoading} sx={{ mr: 2 }}>
            編集
          </Button>
          <Button variant="contained" color="error" onClick={onClickDeleteButton} disabled={isLoading}>
            削除
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography id={'post-title'} variant={'h5'} sx={{ fontWeight: 'bold', mb: 4 }} textAlign={'left'}>
          {post.title}
        </Typography>
      </Box>
    </Box>
  );
};
