import {AppBar, Box, Container, Toolbar} from '@mui/material';
import {PostAddButton} from '@/components/organisms/PostAddButton';
import {Logo} from '@/components/organisms/Logo';
import {ToSignupButton} from '@/components/organisms/ToSignupButton';
import {LoginLink} from '@/components/organisms/LoginLink';
import {useSession} from 'next-auth/react';
import {LogoutButton} from '@/components/organisms/LogoutButton';

/**
 * ヘッダ
 * @constructor
 */
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
                  <LogoutButton sx={{ ml: 2 }} />
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
