import React, { useState } from 'react'
import { Header as MantineHeader } from '@mantine/core'
import { signOut } from 'next-auth/react'
import SignIn from '../Modal/SignIn'

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <MantineHeader height={60} p="xs">
        <button type="button" onClick={() => setOpen(true)}>
          signin
        </button>
        <button type="button" onClick={() => signOut()}>
          signout
        </button>
      </MantineHeader>
      <SignIn opened={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Header
