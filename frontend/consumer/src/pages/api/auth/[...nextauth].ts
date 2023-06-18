import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { BACKEND_API_PATH } from '@/utils/consts/api';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // サインインフォームに表示する名前 (例: "Sign in with...")
      name: 'unko',
      // 認証情報は、サインインページに適切なフォームを生成するために使用されます。
      // 送信されることを期待するフィールドを何でも指定することができます。
      // 例: ドメイン、ユーザー名、パスワード、2FAトークンなど。
      // オブジェクトを通して、任意の HTML 属性を <input> タグに渡すことができます。
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'ユーザー名' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, request) {
        console.log(credentials);
        console.log(request);
        const loginBody = { name: credentials?.username, password: credentials?.password };
        const response = await fetch(BACKEND_API_PATH.LOGIN, {
          method: 'POST',
          body: JSON.stringify(loginBody),
          headers: { 'Content-Type': 'application/json' },
        });
        console.log(response);
        if (response.status !== 200) {
          return null;
        }
        const user = await response.json();
        console.log(user);
        // const { username, password } = credentials
        // ここにロジックを追加して、提供されたクレデンシャルからユーザーを検索します。

        if (user) {
          // 返されたオブジェクトはすべて、JWTの `user` プロパティに保存されます。
          return user;
        } else {
          // もし、NULLを返した場合は、ユーザーに詳細を確認するよう促すエラーが表示されます。
          return null;

          // また、このコールバックをエラーで拒否することもできます。この場合、ユーザーはエラーメッセージをクエリパラメータとして持つエラーページに送られます。
        }
      },
    }),
  ],
});
