import Header from '@/components/layouts/Header/Header';
import Footer from '@/components/layouts/Footer/Footer';
import { ReactElement } from 'react';
import { Container } from '@mui/material';

export const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
