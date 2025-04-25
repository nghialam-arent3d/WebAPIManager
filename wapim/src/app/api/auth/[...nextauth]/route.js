import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { userService } from "@/services/userService";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Check if user exists in Supabase
        const existingUser = await userService.getUserByEmail(user.email);

        if (!existingUser) {
          // Create new user in Supabase
          await userService.createUser({
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider,
            provider_id: profile.sub,
            last_login: new Date().toISOString(),
          });
        } else {
          // Update last login
          await userService.updateUser(user.email, {
            last_login: new Date().toISOString(),
          });
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return true; // Still allow sign in even if Supabase update fails
      }
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST }; 