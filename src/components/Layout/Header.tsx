import React, { useMemo } from 'react'
import {
  ActionIcon,
  Header as MantineHeader,
  Indicator,
  Menu,
  Text,
} from '@mantine/core'
import { signOut, useSession } from 'next-auth/react'
import {
  IconHeart,
  IconLogin,
  IconLogout,
  IconSearch,
  IconShoppingCart,
  IconTruckDelivery,
  IconUser,
  IconUserCircle,
  IconUserPlus,
} from '@tabler/icons'
import Link from 'next/link'
import { useStyles } from '@/styles/mantine'
import { useRouter } from 'next/router'
import classNames from 'classnames/bind'
import { useDisclosure } from '@mantine/hooks'
import SignIn from '../Modal/SignIn'
import styles from './layout.module.scss'

type HeaderProsp = {
  transparent?: boolean
}

const cx = classNames.bind(styles)

function Header({ transparent }: HeaderProsp) {
  const router = useRouter()
  const { classes } = useStyles()
  const { status } = useSession()

  const [opened, openedHandler] = useDisclosure(false)

  const isAuth = useMemo(() => status === 'authenticated', [status])

  function handleClickLinkButton(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    if (window.innerWidth < 768) return
    const { href } = event.currentTarget.dataset
    router.push(href || '#')
  }

  return (
    <>
      <MantineHeader
        className={cx('header', { transparent })}
        height={80}
        p="md"
      >
        <nav className={cx('header__wrapper')}>
          {/* Main Logo */}
          <Text className="piic" component="span" c="main">
            <Link className={cx('inherit', 'header__logo')} href="/">
              PIIC
            </Link>
          </Text>

          {/* Menu List */}
          <div className={cx('header-menu')}>
            <ul role="tablist">
              <Text
                component="li"
                role="tab"
                c="main"
                sx={{ fontWeight: 'bold' }}
              >
                <Link href="/shop/sale">SALE</Link>
              </Text>
              <Text
                component="li"
                role="tab"
                c="sub"
                sx={{ fontWeight: 'bold' }}
              >
                <Link href="/shop/best">BEST</Link>
              </Text>
              <Text component="li" role="tab" sx={{ fontWeight: 'bold' }}>
                <Link href="/shop/women">WOMEN</Link>
              </Text>
              <Text component="li" role="tab" sx={{ fontWeight: 'bold' }}>
                <Link href="/shop/men">MEN</Link>
              </Text>
              <Text component="li" role="tab" sx={{ fontWeight: 'bold' }}>
                <Link href="/shop/kid">KIDS</Link>
              </Text>
            </ul>
          </div>

          {/* Right Side Buttons */}
          <div className={cx('header-buttons')}>
            {/* Search */}
            <ActionIcon
              className={classes.linkButton}
              w={48}
              h={48}
              role="search"
              aria-label="search"
            >
              <IconSearch size={30} />
            </ActionIcon>

            {/* User Menu */}
            <Menu trigger="hover" closeDelay={300}>
              <Menu.Target>
                <ActionIcon
                  className={classes.linkButton}
                  w={48}
                  h={48}
                  aria-label="user"
                  data-href={isAuth ? '/account' : '/account/join'}
                  onClick={handleClickLinkButton}
                >
                  <IconUser size={30} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label className="piic">PIIC</Menu.Label>
                {!isAuth ? (
                  <>
                    <Menu.Item
                      icon={<IconLogin size={14} />}
                      onClick={openedHandler.open}
                    >
                      Sign In
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconUserPlus size={14} />}
                      data-href="/account/new"
                      onClick={handleClickLinkButton}
                    >
                      Sign Up
                    </Menu.Item>
                  </>
                ) : (
                  <>
                    <Menu.Item
                      icon={<IconTruckDelivery size={14} />}
                      data-href="/account/order"
                      onClick={handleClickLinkButton}
                    >
                      Order
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconHeart size={14} />}
                      data-href="/account/wishlist"
                      onClick={handleClickLinkButton}
                    >
                      Wishlist
                    </Menu.Item>

                    <Menu.Label>Account</Menu.Label>
                    <Menu.Item
                      icon={<IconUserCircle size={14} />}
                      data-href="/account"
                      onClick={handleClickLinkButton}
                    >
                      My Page
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconLogout size={14} />}
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </Menu.Item>
                  </>
                )}
                {/* <Menu.Label>Setting</Menu.Label> */}
              </Menu.Dropdown>
            </Menu>

            {/* Cart */}
            {isAuth ? (
              <ActionIcon
                className={classes.linkButton}
                w={48}
                h={48}
                aria-label="cart"
              >
                <Indicator
                  inline
                  label="1"
                  size={18}
                  color="blue"
                  styles={{
                    indicator: {
                      borderRadius: '100%',
                      lineHeight: '18px',
                      fontWeight: 'bold',
                    },
                  }}
                >
                  <Link className={cx('inherit')} href="/account/cart">
                    <IconShoppingCart size={30} />
                  </Link>
                </Indicator>
              </ActionIcon>
            ) : null}
          </div>
        </nav>
      </MantineHeader>
      <SignIn opened={opened} onClose={openedHandler.close} />
    </>
  )
}

export default Header
