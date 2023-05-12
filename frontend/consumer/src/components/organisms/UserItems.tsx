import User from '@/features/user/models/User';
import { Box, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';

export const UserItems = ({ user, sx }: { user: User; sx?: SxProps<Theme> }) => {
  return (
    <Box sx={sx}>
      <Typography variant={'h6'} sx={{ fontWeight: 'bold' }} mb={1}>
        名前
      </Typography>
      <Typography mb={1}>{`${user.lastName} ${user.firstName}`}</Typography>
      <Typography variant={'h6'} sx={{ fontWeight: 'bold' }} mb={1}>
        メールアドレス
      </Typography>
      <Typography mb={1}>{user.mailAddress}</Typography>
    </Box>
  );
};
