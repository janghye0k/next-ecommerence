import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import KakaoProvider from 'next-auth/providers/kakao'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/lib/prisma'

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  /**
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
   */
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const provider = account?.provider as 'kakao' | 'google' | 'credentials'

      // Case provider is 'credentials', the authorize function will perform verification, so return true.
      // 프로바이더가 'credentials'인 경우는 authorize 함수에서 검증을 진행하기에 true를 리턴한다.
      if (provider === 'credentials') return true

      // Case social login, check if there is a user, and if not, redirect to account page.
      // 소셜로그인일 경우 유저가 있는지 확인하고 없다면 회원가입 페이지로 이동시킨다.
      const findUser = await prisma.user.findUnique({
        where: { email: user.email || '-1' },
      })
      return (
        Boolean(findUser) ||
        `/account?redirect_from=signin&provider=${provider}`
      )
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('@@@ JWT @@@')
      console.log('token', token)
      console.log('user', user)
      console.log('account', account)
      console.log('profile', profile)
      console.log('isNewUser', isNewUser)
      return token
    },
    async session({ session, token, user }) {
      console.log('@@@ Session @@@')
      console.log('session', session)
      console.log('token', token)
      console.log('user', user)
      return session
    },
  },
  providers: [
    // 카카오 로그인
    KakaoProvider({
      clientId: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET,
    }),
    // 구글 로그인
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // 일반 로그인
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: '이메일',
          type: 'text',
          placeholder: '이메일을 입력하세요.',
        },
        password: {
          label: '비밀번호',
          type: 'password',
          placeholder: '비밀번호를 입력하세요.',
        },
      },
      authorize: async function authorize(credentials, req) {
        // DB를 조회하여 유저 존재여부를 확인하고 비밀번호를 대조하여 올바른 접속인지 확인한다.
        if (!credentials) return null
        const { email, password } = credentials
        const user = await prisma.user.findUnique({
          where: { email },
        })

        /** @todo 비밀번호 암호화 비교 */
        const encodePassword = password

        const isNotMatch = !user || user.pwd !== encodePassword
        return isNotMatch ? user : null
      },
    }),
  ],
})
