import { Divider } from '@/dui/core'
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
      <Divider />
      <Divider size={30} />
      <Divider variant="dashed">hello</Divider>
      <div style={{ height: '40px' }}>
        <Divider orientation="vertical">test</Divider>
      </div>
    </>
  )
}
