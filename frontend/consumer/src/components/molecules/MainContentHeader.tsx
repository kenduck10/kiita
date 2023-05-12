import { Box, Divider, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';

export const MainContentHeader = ({ title, sx }: { title: string; sx?: SxProps<Theme> }) => {
  return (
    <Box sx={sx}>
      <Typography variant={'h5'} sx={{ fontWeight: 'bold', mb: 4 }} textAlign={'center'}>
        {title}
      </Typography>
      <Divider />
    </Box>
  );
};
