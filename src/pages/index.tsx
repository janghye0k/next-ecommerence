import { Switch } from '@/dui/core'
import { Skeleton } from '@/dui/feedback'
import Head from 'next/head'
import { FaWalking } from 'react-icons/fa'

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

      <Skeleton height={30} radius={1} />
    </>
  )
}
