import { AppBar, Container, Toolbar } from '@mui/material';
import { PostAddButton } from '@/components/organisms/PostAddButton';
import { Logo } from '@/components/organisms/Logo';

export const Header = () => {
  return (
    <header>
      <AppBar position="relative" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar>
            <Logo />
            <PostAddButton />
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
