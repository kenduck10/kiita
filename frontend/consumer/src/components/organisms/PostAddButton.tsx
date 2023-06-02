import { Button, Typography } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { PAGE_PATH } from '@/utils/consts/route';

const StyledButton = styled(Button)({
  [`&,&:hover`]: {
    backgroundColor: 'white',
    boxShadow: 'none',
  },
});
export const PostAddButton = () => {
  const router = useRouter();
  const onClickToAdd = async () => {
    await router.push(PAGE_PATH.POST_NEW);
  };
  return (
    <StyledButton id={'add-post-button'} variant="contained" onClick={onClickToAdd}>
      <Typography fontWeight={'bold'} color={'black'}>
        {'投稿する '}
      </Typography>
      <EditIcon sx={{ color: 'black' }} />
    </StyledButton>
  );
};
