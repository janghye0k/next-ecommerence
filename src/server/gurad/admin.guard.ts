import { getAuthOptions } from '@/pages/api/auth/[...nextauth]'
import { NextAuthApiRequest } from '@/types/next-auth'
import { NextApiResponse } from 'next'
import {
  createMiddlewareDecorator,
  NextFunction,
  UnauthorizedException,
} from 'next-api-decorators'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/prisma'

const AdminGuard = createMiddlewareDecorator(
  async (req: NextAuthApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = await getServerSession(req, res, getAuthOptions(req, res))
    const auth = { session }
    if (!session) {
      throw new UnauthorizedException(
        'Wrong approach. Route accessible only to authorized users.',
      )
    }

    if (session.user.role !== 1) {
      throw new UnauthorizedException(
        'Wrong approach. Only admin can access to this page',
      )
    }

    req.auth = auth
    return next()
  },
)

export default AdminGuard
