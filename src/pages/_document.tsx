import Document, { Html, Head, Main, NextScript } from 'next/document'
import { createGetInitialProps } from '@mantine/next'

const getInitialProps = createGetInitialProps()

export default class PIICDocument extends Document {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <section id="portal"></section>
          <NextScript />
        </body>
      </Html>
    )
  }
}
