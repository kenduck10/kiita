import { Card, CardActionArea, CardContent, Link, SxProps, Theme } from '@mui/material';
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
  const postDetailPath = PAGE_PATH_BUILDER.POST_DETAIL(postSummary.id);
  const onClickCard = async () => {
    await router.push(postDetailPath);
  };
  const baseSx = { border: 0 };
  const mergedSx = sx ? { ...baseSx, ...sx } : baseSx;
  return (
    <Card variant={'outlined'} sx={mergedSx}>
      <StyledCardActionArea onClick={onClickCard} disableRipple>
        <StyledCardContent>
          <Link href={postDetailPath} variant={'h6'} fontWeight={'bold'} underline={'hover'} color={'inherit'}>
            {postSummary.title}
          </Link>
        </StyledCardContent>
      </StyledCardActionArea>
    </Card>
  );
};
