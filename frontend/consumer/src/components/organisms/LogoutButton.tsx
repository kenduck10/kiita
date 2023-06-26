import { Button, SxProps, Theme } from '@mui/material';
import React from 'react';
import { PAGE_PATH } from '@/utils/consts/route';
import { signOut } from 'next-auth/react';

export const LogoutButton = ({ sx }: { sx?: SxProps<Theme> }) => {
  return (
    <Button sx={sx} variant={'contained'} onClick={async () => await signOut({ callbackUrl: PAGE_PATH.HOME })}>
      ログアウト
    </Button>
  );
};
