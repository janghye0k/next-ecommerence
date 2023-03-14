import axios from 'axios'
import Head from 'next/head'

export default function Home() {
  const test = async () => {
    const res = await axios.get('/api/user/info', {
      params: { includes: ['reviews', 'orders'] },
    })
    console.log(res.data)
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
