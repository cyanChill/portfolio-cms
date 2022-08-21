import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import dbConnect from "../../../utils/mongoConfig";
import User from "../../../models/User";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials, req) => {
        await dbConnect();

        const user = await User.findOne(
          { username: credentials.username },
          "+password"
        );

        // Throw error if no user is found
        if (!user) throw new Error("Invalid credentials");
        // Throw error as incorrect password
        if (credentials.password !== user.password) {
          throw new Error("Invalid credentials.");
        }

        // User inputted correct password for account!
        return { _id: user._id, username: user.username };
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/accounts/login'
  }
};

export default NextAuth(authOptions);
