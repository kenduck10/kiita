import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { BACKEND_API_PATH } from '@/utils/consts/api';
import { PAGE_PATH } from '@/utils/consts/route';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'name', type: 'text', placeholder: 'ユーザー名' },
        password: { label: 'password', type: 'password', placeholder: 'パスワード' },
      },
      async authorize(credentials, request): Promise<User | null> {
        const loginBody = { name: credentials?.username, password: credentials?.password };
        const response = await fetch(BACKEND_API_PATH.LOGIN, {
          method: 'POST',
          body: JSON.stringify(loginBody),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.status !== 200) {
          return null;
        }
        const token = response.headers.get('x-auth-token');
        const user = { ...(await response.json()), ...{ accessToken: token } };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 初回認証時のみuserが存在
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: PAGE_PATH.LOGIN,
  },
};
export default NextAuth(authOptions);
