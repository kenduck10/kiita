import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import PostSummary from '@/features/post/models/PostSummary';
import styled from '@emotion/styled';

const StyledCardContent = styled(CardContent)({
  [`&:last-child`]: {
    paddingBottom: '16px',
  },
});

export const PostSummaryCard = ({ postSummary }: { postSummary: PostSummary }) => {
  return (
    <Card>
      <StyledCardContent>
        <Typography>{postSummary.title}</Typography>
      </StyledCardContent>
    </Card>
  );
};
