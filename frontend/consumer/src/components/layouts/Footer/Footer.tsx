import { Container, Typography } from '@mui/material';
import React from 'react';

export const Footer = () => {
  return (
    <footer>
      <Container maxWidth="xl" sx={{ py: 1 }}>
        <Typography>© 2022 kenduck all rights reserved.</Typography>
      </Container>
    </footer>
  );
};

export default Footer;
