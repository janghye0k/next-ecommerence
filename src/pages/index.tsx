import { Burger } from '@/dui/core'
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
      <Burger open={open} color="red" onClick={toggle} size="xs" />
      <Burger open={open} color="blue" onClick={toggle} size="sm" />
      <Burger open={open} onClick={toggle} />
      <Burger open={open} onClick={toggle} size="lg" />
      <Burger
        open={open}
        variant="solid"
        color="teal"
        onClick={toggle}
        size="xl"
      />
    </>
  )
}
