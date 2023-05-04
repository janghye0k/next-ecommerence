import { Button, Switch } from '@/dui/core'
import { Notification } from '@/dui/feedback'
import { Dialog, Drawer, Modal } from '@/dui/overlay'
import Head from 'next/head'
import { useState } from 'react'
import { FaWalking } from 'react-icons/fa'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

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
      <Button color="blue" onClick={() => setIsOpen((s) => !s)}>
        {isOpen ? 'Opened' : 'Closed'}
      </Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Notification closeButtonProps={{ onClick: () => setIsOpen(false) }}>
          asdfsdf
        </Notification>
      </Modal>
    </>
  )
}
