import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { PostAddButton } from '@/components/organisms/PostAddButton';
import { Logo } from '@/components/organisms/Logo';
import { ToSignupButton } from '@/components/organisms/ToSignupButton';
import { LoginLink } from '@/components/organisms/LoginLink';
import { signOut, useSession } from 'next-auth/react';
import { PAGE_PATH } from '@/utils/consts/route';

export const Header = () => {
  const { status } = useSession();
  return (
    <header>
      <AppBar position="relative" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Logo />
            </Box>
            <Box>
              {status === 'authenticated' && (
                <>
                  <PostAddButton />
                  <Button
                    sx={{ ml: 2 }}
                    variant={'contained'}
                    onClick={async () => await signOut({ callbackUrl: PAGE_PATH.HOME })}
                  >
                    ログアウト
                  </Button>
                </>
              )}
              {status === 'unauthenticated' && (
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
