import { Card, CardActionArea, CardContent, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import PostSummary from '@/features/post/models/PostSummary';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { PAGE_PATH_BUILDER } from '@/utils/consts/route';

const StyledCardContent = styled(CardContent)({
  [`&:last-child`]: {
    paddingBottom: '16px',
  },
});

const StyledCardActionArea = styled(CardActionArea)({
  [`.MuiCardActionArea-focusHighlight`]: {
    backgroundColor: 'transparent',
  },
});

export const PostSummaryCard = ({ postSummary, sx }: { postSummary: PostSummary; sx?: SxProps<Theme> }) => {
  const router = useRouter();
  const onClickCard = async () => {
    await router.push(PAGE_PATH_BUILDER.POST_DETAIL(postSummary.id));
  };
  const baseSx = { border: 0 };
  const mergedSx = sx ? { ...baseSx, ...sx } : baseSx;
  return (
    <Card variant={'outlined'} sx={mergedSx}>
      <StyledCardActionArea onClick={onClickCard}>
        <StyledCardContent>
          <Typography variant={'h6'} fontWeight={'bold'}>
            {postSummary.title}
          </Typography>
        </StyledCardContent>
      </StyledCardActionArea>
    </Card>
  );
};
