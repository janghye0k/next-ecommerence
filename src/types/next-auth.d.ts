import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

type NextAuthUser = DefaultUser

declare module 'next-auth' {
  interface User extends DefaultUser, Partial<Omit<PrismaUser, 'id'>> {}

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: string
    user: {
      /** The user's postal address. */
    } & DefaultSession &
      PrismaUser
  }
}
