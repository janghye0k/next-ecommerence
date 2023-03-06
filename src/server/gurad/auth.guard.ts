import { getAuthOptions } from '@/pages/api/auth/[...nextauth]'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  createMiddlewareDecorator,
  NextFunction,
  UnauthorizedException,
} from 'next-api-decorators'
import { getServerSession } from 'next-auth'
import { NextAuthApiRequest } from '@/types/server'

const AuthGuard = createMiddlewareDecorator(
  async (req: NextAuthApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = await getServerSession(req, res, getAuthOptions(req, res))
    const auth = { session }
    if (!session) {
      throw new UnauthorizedException(
        'Wrong approach. Route accessible only to authorized users.',
      )
    }
    req.auth = auth
    return next()
  },
)

export default AuthGuard
