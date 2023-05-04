import Header from '@/components/layouts/Header/Header';
import Footer from '@/components/layouts/Footer/Footer';
import { ReactElement } from 'react';

export const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
