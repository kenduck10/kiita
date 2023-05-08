import Header from '@/components/layouts/Header/Header';
import Footer from '@/components/layouts/Footer/Footer';
import { ReactElement } from 'react';
import { Box, Container } from '@mui/material';

export const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <Box id="root-box">
      <Header />
      <Container maxWidth="xl" sx={{ my: 2 }}>
        <main>{children}</main>
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
