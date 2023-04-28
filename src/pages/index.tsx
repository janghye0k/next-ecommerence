import { Switch } from '@/dui/core'
import { Loader } from '@/dui/feedback'
import Head from 'next/head'

export default function Home() {
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const $html = document.querySelector('html')
    if ($html)
      $html.dataset.theme = event.currentTarget.checked ? 'dark' : 'light'
  }
  return (
    <>
      <Head>
        <title>Home | PIIC</title>
      </Head>
      <Switch onChange={onChange} />
      <main>Welcome</main>
      <Loader />
    </>
  )
}
