import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const { pathname } = nextUrl;
      const isLoggedIn = !!auth?.user;
      const isPrivateRoute = pathname !== '/';
      if (isPrivateRoute) {
        if (isLoggedIn) return true;
        return false; // Редирект на логин
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/plants', nextUrl));
      }
      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig;
