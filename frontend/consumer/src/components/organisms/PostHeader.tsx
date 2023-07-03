import { Box, Button, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import Post from '@/features/post/models/Post';
import { toJapaneseFormatDate } from '@/utils/functions/date';

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
  const buildPublishedDateTypography = (post: Post) => {
    const formattedFirstPublishedAt = toJapaneseFormatDate(post.firstPublishedAt);
    const firstPublishedAt = `投稿日 ${formattedFirstPublishedAt}`;
    if (!post.isRePublishedAt) {
      return firstPublishedAt;
    }
    const formattedLastPublishedAt = toJapaneseFormatDate(post.lastPublishedAt);
    const lastPublishedAt = `　更新日 ${formattedLastPublishedAt}`;
    return firstPublishedAt + lastPublishedAt;
  };

  return (
    <Box sx={sx}>
      <Box mb={2} display={'flex'} justifyContent={'flex-end'}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography>{`@${post.authorName}`}</Typography>
          <Typography variant={'inherit'}>{buildPublishedDateTypography(post)}</Typography>
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
