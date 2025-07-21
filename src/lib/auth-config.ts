import { type DefaultSession, type NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { getUserByToken } from "~/components/features/auth/api";
import { User } from "~/components/features/user/types";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
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
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        token: { label: "Token" },
      },
      async authorize({ token }): Promise<{ id: string }> {
        return { id: token as string };
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
    jwt: async ({ token: prevData }) => {
      if (!prevData.sub) {
        return prevData;
      }

      const jwt = prevData.sub;
      console.log({ jwt });
      const findedUser = await getUserByToken(jwt);
      console.log({ findedUser });

      return {
        ...prevData,
        ...findedUser,
        token: jwt,
      };
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...session.user,
          ...token,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
