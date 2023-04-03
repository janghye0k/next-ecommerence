import React, { useCallback, useEffect, useMemo } from 'react'
import { AppShell, LoadingOverlay } from '@mantine/core'
import classNames from 'classnames/bind'
import { useDisclosure } from '@mantine/hooks'
import { useSession } from 'next-auth/react'
import useLayoutStore from '@/store/layout.store'
import Header from './Header'
import Footer from './Footer'
import styles from './layout.module.scss'

const cx = classNames.bind(styles)

type LayoutProps = {
  children?: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const { status } = useSession()
  const isAuthLoading = useMemo(() => status === 'loading', [status])
  const isLoading = useLayoutStore((state) => state.isLoading)

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
      <LoadingOverlay visible={isAuthLoading || isLoading} />
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
