import Radio from '@/dui/core/Radio'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | PIIC</title>
      </Head>
      <main>Welcome</main>
      <Radio name="simpson">Homer</Radio>
      <Radio name="simpson" size="md" color="theme">
        Bart
      </Radio>
      <Radio name="simpson" size="lg" color="teal">
        Lisa
      </Radio>
    </>
  )
}
