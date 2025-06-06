import { type DefaultSession, type NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { User } from "~/components/features/user/types";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      token: string;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ email, password }): Promise<{ id: string } | null> {
        // const user = await login({
        //   email: email as string,
        //   password: password as string,
        // });
        // return { id: user.token };
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  callbacks: {
    jwt: async ({ token }) => {
      if (!token.sub) {
        return token;
      }

      const jwt = token.sub;

      const findedUser = {}; // await findMe({ forceToken: jwt });

      return {
        ...token,
        token: jwt,
        ...findedUser,
      };
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          ...(token as User),
        };
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
