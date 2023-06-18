import { Button, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { PAGE_PATH } from '@/utils/consts/route';

const StyledButton = styled(Button)({
  [`&,&:hover`]: {
    backgroundColor: 'white',
    boxShadow: 'none',
  },
});
export const ToSignupButton = ({ sx }: { sx?: SxProps<Theme> }) => {
  const router = useRouter();
  const onClickToSignup = async () => {
    await router.push(PAGE_PATH.SIGNUP);
  };
  return (
    <StyledButton id={'to-signup-button'} variant="contained" onClick={onClickToSignup} sx={sx}>
      <Typography fontWeight={'bold'} color={'black'}>
        {'新規登録'}
      </Typography>
    </StyledButton>
  );
};
