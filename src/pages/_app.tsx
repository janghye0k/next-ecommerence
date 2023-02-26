import '@/styles/sanitize.reset.css'
import '@/scss/base/_index.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Layout from '@/components/Layout'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
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
        <title>PIIC | Next.js e-commerence</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Hydrate state={pageProps.dehydratedState}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'light',
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MantineProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}
