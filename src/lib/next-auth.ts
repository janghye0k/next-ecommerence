import { getAuthOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export function getSession(req: any, res: any) {
  return getServerSession(req, res, getAuthOptions(req, res))
}
