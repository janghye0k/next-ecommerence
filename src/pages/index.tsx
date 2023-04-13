import Switch from '@/dui/core/Switch'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | PIIC</title>
      </Head>
      <main>Welcome</main>
      <Switch disabled>Switch</Switch>
      <Switch size="md" color="theme">
        Switch
      </Switch>
      <Switch size="lg" color="teal">
        Switch
      </Switch>
    </>
  )
}
