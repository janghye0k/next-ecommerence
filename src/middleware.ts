import type { NextRequest, NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET

const notAuthPaths = ['/account/new', '/account/join']

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const session = await getToken({ req, secret, raw: true })
  const { pathname } = req.nextUrl

  const isNotAuthPath = notAuthPaths.some((path) => pathname.startsWith(path))
  if (session && isNotAuthPath) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  if (!session && !isNotAuthPath) {
    return NextResponse.redirect(new URL('/', req.url))
  }
}

export const config = {
  matcher: [
    // only for not auth
    '/account/new',
    '/account/join',
    // only for auth
  ],
}
