import { Button, Link } from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';
import { PAGE_PATH } from '@/utils/consts/route';

const StyledButton = styled(Button)({
  [`&,&:hover`]: {
    backgroundColor: 'white',
    boxShadow: 'none',
  },
});
export const LoginLink = () => {
  return (
    <Link href={PAGE_PATH.LOGIN} fontWeight={'bold'} underline={'hover'} color={'inherit'}>
      ログイン
    </Link>
  );
};
