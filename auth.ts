import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./prisma/prisma";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { getAccountByUserId } from "./data/account";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }
      const existingUser = await getUserById(user.id ?? "");

      if (!existingUser?.emailVerified) {
        return false;
      }
      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      // If there is existing account meaning they login with google account
      const existingAccount = await getAccountByUserId(existingUser.id);

      // token.isOauth --> if they authenticated with google provider
      token.isOauth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.image = existingUser.image;

      return token;
    },
    async session({ token, session }) {
      // console.log("session token", token);
      console.log("session object", session);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isOauth: token.isOauth,
          name: token.name,
          role: token.role,
        },
      };
    },
  },
});
