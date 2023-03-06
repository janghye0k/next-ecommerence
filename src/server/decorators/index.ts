import { NextAuthApiRequest } from '@/types/server'
import { createParamDecorator } from 'next-api-decorators'

export const GetSession = createParamDecorator<any | undefined>(
  (req: NextAuthApiRequest) => {
    return req.auth?.session
  },
)
