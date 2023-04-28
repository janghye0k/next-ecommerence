import { Switch } from '@/dui/core'
import { Notification } from '@/dui/feedback'
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

      <Notification title="Title" icon={<FaWalking />}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, magni.
      </Notification>
    </>
  )
}
