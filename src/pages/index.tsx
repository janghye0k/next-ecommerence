import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [open, setOpen] = useState(false)

  function toggle() {
    setOpen((state) => !state)
  }
  return (
    <>
      <Head>
        <title>Home | PIIC</title>
      </Head>
      <main>Welcome</main>
    </>
  )
}
