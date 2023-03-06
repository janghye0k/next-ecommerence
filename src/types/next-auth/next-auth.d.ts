import { DefaultUser } from 'next-auth'
import { NextAuthSession } from './index'

declare module 'next-auth' {
  interface User extends DefaultUser, Partial<Omit<PrismaUser, 'id'>> {}

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type Session = NextAuthSession
}
