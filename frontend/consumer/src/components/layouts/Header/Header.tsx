import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { PostAddButton } from '@/components/organisms/PostAddButton';
import { Logo } from '@/components/organisms/Logo';

export const Header = () => {
  return (
    <header>
      <AppBar position="relative" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Logo />
            </Box>
            <Box>
              <PostAddButton />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
