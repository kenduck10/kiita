import { AppBar, Container, Toolbar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <AppBar position="relative">
        <Container maxWidth="xl">
          <Toolbar>
            <Link href={'/'}>
              <Image src="/logo.svg" alt="logo" width="96" height="32" />
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
