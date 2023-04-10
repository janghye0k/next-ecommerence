import '@/styles/sanitize.reset.css'
import '@/scss/base/_index.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import Layout from '@/components/Layout'
import ReactQueryProvider from '@/components/Providers/ReactQueryProvider'
import axios from 'axios'
import qs from 'qs'

axios.defaults.paramsSerializer = {
  serialize: (params: any) => {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="JangHyeok Kim" />
        <meta
          name="description"
          content="Next.js, react, PIIC online cloth e-commerence"
        />
        <meta
          name="keywords"
          content="next.js,react,e-commerence,shop,PIIC,쇼핑, 쇼핑몰, 의류"
        />
        <link
          rel="shortcut icon"
          href="favicons/favicon.ico"
          type="image/x-icon"
        />
        <link rel="manifest" href="/favicons/site.webmanifest.json" />
        <title>PIIC | Next.js e-commerence</title>
      </Head>
      <SessionProvider session={session}>
        <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
          {/* <Layout> */}
          <Component {...pageProps} />
          {/* </Layout> */}
        </ReactQueryProvider>
      </SessionProvider>
    </>
  )
}
