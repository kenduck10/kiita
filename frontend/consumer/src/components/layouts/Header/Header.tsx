import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { PostAddButton } from '@/components/organisms/PostAddButton';
import { Logo } from '@/components/organisms/Logo';
import { useRouter } from 'next/router';
import { ToSignupButton } from '@/components/organisms/ToSignupButton';
import { LoginLink } from '@/components/organisms/LoginLink';
import { signOut, useSession } from 'next-auth/react';

export const Header = () => {
  const route = useRouter();
  const { data: session } = useSession();
  return (
    <header>
      <AppBar position="relative" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Logo />
            </Box>
            <Box>
              {session && (
                <>
                  <PostAddButton />
                  <Button sx={{ ml: 2 }} variant={'contained'} onClick={() => signOut()}>
                    ログアウト
                  </Button>
                </>
              )}
              {!session && (
                <>
                  <LoginLink />
                  <ToSignupButton sx={{ ml: 2 }} />
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
