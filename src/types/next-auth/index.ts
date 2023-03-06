import { DefaultSession } from 'next-auth'
import { NextApiRequest } from 'next'

export interface NextAuthSession extends DefaultSession {
  user: PrismaUser
}

export interface NextAuthApiRequest extends NextApiRequest {
  auth?: { session: NextAuthSession | null }
}
