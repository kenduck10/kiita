import { Card, CardContent, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import PostSummary from '@/features/post/models/PostSummary';
import styled from '@emotion/styled';

const StyledCardContent = styled(CardContent)({
  [`&:last-child`]: {
    paddingBottom: '16px',
  },
});

export const PostSummaryCard = ({ postSummary, sx }: { postSummary: PostSummary; sx?: SxProps<Theme> }) => {
  const baseSx = { border: 0 };
  const mergedSx = sx ? { ...baseSx, ...sx } : baseSx;
  return (
    <Card variant={'outlined'} sx={mergedSx}>
      <StyledCardContent>
        <Typography>{postSummary.title}</Typography>
      </StyledCardContent>
    </Card>
  );
};
