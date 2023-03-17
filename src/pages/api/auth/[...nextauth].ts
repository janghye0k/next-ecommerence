import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@/server/adapter'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { encode, decode } from 'next-auth/jwt'
import { setCookie, getCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'
import uuid from '@/lib/uuid'

const SESSION_MAXAGE = 30 * 24 * 60 * 60 // 7 days

const adapter = PrismaAdapter(prisma)
const generateSessionToken = uuid
const fromDate = (time: number, date = Date.now()) => {
  return new Date(date + time * 1000)
}

export const getAuthOptions = (req: any, res: any): NextAuthOptions => {
  return {
    adapter,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'database',
      maxAge: SESSION_MAXAGE,
      updateAge: 12 * 60 * 60, // 12 hours
    },
    pages: {
      signOut: '/',
      newUser: '/account/welcome', // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    jwt: {
      // Customize the JWT encode and decode functions to overwrite the default behaviour of storing the JWT token in the session  cookie when using credentials providers. Instead we will store the session token reference to the session in the database.
      encode: async ({ token, secret, maxAge }) => {
        if (
          typeof req.query !== 'undefined' &&
          req.query.nextauth?.includes('callback') &&
          req.query.nextauth?.includes('credentials') &&
          req.method === 'POST'
        ) {
          const cookie = getCookie('next-auth.session-token', {
            req,
            res,
          }) as string
          if (cookie) return cookie
          return ''
        }
        // Revert to default behaviour when not in the credentials provider callback flow
        return encode({ token, secret, maxAge })
      },
      decode: async ({ token, secret }) => {
        if (
          typeof req.query !== 'undefined' &&
          req.query.nextauth?.includes('callback') &&
          req.query.nextauth?.includes('credentials') &&
          req.method === 'POST'
        ) {
          return null
        }
        // Revert to default behaviour when not in the credentials provider callback flow
        return decode({ token, secret })
      },
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        const provider = account?.provider as 'google' | 'credentials'

        // Case provider is 'credentials', the authorize function will perform verification, so return true.
        // 프로바이더가 'credentials'인 경우는 authorize 함수에서 검증을 진행하기에 true를 리턴한다.
        if (provider === 'credentials') {
          const sessionToken = generateSessionToken()
          const sessionExpiry = fromDate(SESSION_MAXAGE)

          await adapter.createSession({
            sessionToken,
            userId: user.id,
            expires: sessionExpiry,
          })
          setCookie('next-auth.session-token', sessionToken, {
            expires: sessionExpiry,
            req,
            res,
            httpOnly: true,
          })

          return true
        }

        if (!account) return false
        // Case social login, check if there is a user, and if not, redirect to account page.
        // 소셜로그인일 경우 유저가 있는지 확인하고 없다면 회원가입 페이지로 이동시킨다.
        const findUser = await prisma.user.findUnique({
          where: { email: user.email || '' },
        })
        if (!findUser)
          return `/account/new?redirect_from=signin&${provider}=${user.email}`

        // Case first social login, create account (provider = google)
        // 소셜로그인을 처음 진행하는경우 provider가 google인 계정을 생성해준다.
        const findAccount = await prisma.account.findFirst({
          where: {
            providerAccountId: account.providerAccountId,
            provider: account.provider,
            userId: findUser.id,
          },
        })
        if (!findAccount) {
          await prisma.account.create({
            data: { ...account, userId: findUser.id },
          })
          adapter.linkAccount(findAccount as any)
        }

        return true
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (user) {
          token.id = user.id
        }
        return token
      },
      async session({ session, token, user }) {
        if (token) {
          session.id = token.id as string
        }
        delete user.pwd
        session.user = { ...session.user, ...(user as PrismaUser) }
        return session
      },
    },
    providers: [
      // 일반 로그인
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: {
            label: '아이디',
            type: 'text',
            placeholder: '아이디를 입력하세요.',
          },
          password: {
            label: '비밀번호',
            type: 'password',
            placeholder: '비밀번호를 입력하세요.',
          },
        },
        authorize: async function authorize(credentials) {
          if (!credentials) return null

          const { username, password } = credentials
          const user = (await prisma.user.findUnique({
            where: { username },
          })) as PrismaUser | null

          if (!user) return null // 찾은 유저가 없을경우 실패

          const hashedPassword = user.pwd || '-1'

          const isMatch = await bcrypt.compare(password, hashedPassword)
          return isMatch ? user : null // 비밀번호가 일차하지않으면 실패
        },
      }),

      // 구글 로그인
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
    ],
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return NextAuth(req, res, getAuthOptions(req, res))
}
