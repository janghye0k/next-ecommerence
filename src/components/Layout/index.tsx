import React, { useCallback, useEffect } from 'react'
import { AppShell } from '@mantine/core'
import classNames from 'classnames/bind'
import { useDisclosure } from '@mantine/hooks'
import Header from './Header'
import Footer from './Footer'
import styles from './layout.module.scss'

const cx = classNames.bind(styles)

type LayoutProps = {
  children?: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const [visible, visibleHandler] = useDisclosure(false)

  const handleChangeScroll = useCallback(
    (event: Event) => {
      const isHome = window.location.pathname === '/'
      const isTop = window.scrollY === 0
      visibleHandler[isHome && isTop ? 'open' : 'close']()
    },
    [visibleHandler],
  )

  useEffect(() => {
    window.addEventListener('scroll', handleChangeScroll)
    return () => {
      window.removeEventListener('scroll', handleChangeScroll)
    }
  }, [handleChangeScroll])

  return (
    <>
      <AppShell
        classNames={{ body: cx('body'), main: cx('main') }}
        miw={463}
        padding="md"
        header={<Header transparent={visible} />}
      >
        {children}
      </AppShell>
      <Footer />
    </>
  )
}

export default Layout
