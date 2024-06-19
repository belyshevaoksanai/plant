import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const { pathname } = nextUrl
      if (pathname === "/plants") return !!auth
      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig;
