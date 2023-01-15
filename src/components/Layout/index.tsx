import React from 'react'
import { AppShell } from '@mantine/core'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = {
  children?: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppShell padding="md" header={<Header />}>
        {children}
      </AppShell>
      <Footer />
    </>
  )
}

export default Layout
