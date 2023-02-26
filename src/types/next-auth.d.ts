import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

type NextAuthUser = DefaultUser

declare module 'next-auth' {
  interface User extends DefaultUser {
    foo?: string
  }
  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account {
    foo?: string
  }
  /** The OAuth profile returned from your provider */

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address?: string
    } & DefaultSession
  }
}
