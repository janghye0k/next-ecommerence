import Head from 'next/head'
import axios from 'axios'

export default function Home() {
  const test = async () => {
    axios.post('/api/email/verification', {
      email: 'd0or_hyeok@naver.com',
    })
  }
  return (
    <>
      <Head>
        <title>Home | PIIC</title>
      </Head>
      <main>Welcome</main>
      <button type="button" onClick={test}>
        asfasdf
      </button>
    </>
  )
}
