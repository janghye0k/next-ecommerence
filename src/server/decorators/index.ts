import { NextApiRequest } from 'next'
import { NextAuthApiRequest, NextAuthSession } from '@/types/next-auth'
import { createParamDecorator } from 'next-api-decorators'

export const GetSession = createParamDecorator<
  NextAuthSession | null | undefined
>((req: NextAuthApiRequest) => {
  return req.auth?.session
})
