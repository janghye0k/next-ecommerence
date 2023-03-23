import React, { useCallback, useEffect, useMemo } from 'react'
import {
  ActionIcon,
  Header as MantineHeader,
  Indicator,
  Menu,
  Text,
  createStyles,
  Burger,
  Drawer,
  Box,
  List,
} from '@mantine/core'
import { signOut, useSession } from 'next-auth/react'
import {
  IconHeart,
  IconLogin,
  IconLogout,
  IconSearch,
  IconShoppingBag,
  IconTruckDelivery,
  IconUser,
  IconUserCircle,
  IconUserPlus,
} from '@tabler/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames/bind'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import SignIn from '../Modal/SignIn'
import styles from './layout.module.scss'

type HeaderProsp = {
  transparent?: boolean
}

const cx = classNames.bind(styles)

const useStyles = createStyles((theme) => {
  const linkButton = {
    transition: 'ease .1s all',
    '&:hover': {
      backgroundColor: 'unset',
      color: theme.colors.dark,
    },
    '&:active': {
      transform: 'unset',
      backgroundColor: theme.colors.gray[0],
    },
  }
  return {
    linkButton,
    userLinkButton: {
      ...linkButton,
      '@media screen and (max-width:768px)': {
        display: 'none',
      },
    },
    userLinkButton_tablet: {
      ...linkButton,
      display: 'none',
      '@media screen and (max-width:768px)': {
        display: 'flex',
      },
    },
    userMenuItem: {
      width: 'fit-content',
      cursor: 'pointer',
      '&:hover, &:active': {
        color: theme.colors.dark,
      },
    },
  }
})

function Header({ transparent }: HeaderProsp) {
  const router = useRouter()
  const { classes } = useStyles()
  const { status, data: session } = useSession()

  const [openLogin, openLoginHandler] = useDisclosure(false)
  const [openMenu, openMenuHandler] = useDisclosure(false)
  const [openUser, openUserHandler] = useDisclosure(false)

  const isAuth = useMemo(() => status === 'authenticated', [status])

  /** 버튼에 data-href 가 있는 버튼들, 페이지 이동 */
  function handleClickLinkButton(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    const { href } = event.currentTarget.dataset
    if (window.location.pathname !== href) router.push(href || '#')
  }

  function handleClickSignOut(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    signOut().then(() => console.log('asdfasdf'))
  }

  /** 반응형 테블릿에서 유저아이콘 버튼 클릭시 */
  function handleClickUserButton(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    openMenuHandler.close()
    openUserHandler.toggle()
  }

  /** 반응형 테블릿에서 버거 버튼 클릭시 */
  function handleClickBurgurMenu(event: React.MouseEvent<HTMLElement>) {
    openUserHandler.close()
    openMenuHandler.toggle()
  }

  /** 모든 모달 및 드로워를 닫는다 */
  const closeAll = useCallback(() => {
    openUserHandler.close()
    openMenuHandler.close()
    openLoginHandler.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => {
      closeAll()
    }
  }, [router.pathname, closeAll])

  return (
    <>
      <MantineHeader
        className={cx('header', { transparent, 'menu-opened': openMenu })}
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
            <Menu closeDelay={300}>
              <Menu.Target>
                <ActionIcon
                  className={classes.userLinkButton}
                  w={48}
                  h={48}
                  aria-label="user"
                >
                  <IconUser size={30} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown className={cx('header-buttons__drowdown')}>
                <Menu.Label className="piic">PIIC</Menu.Label>
                {!isAuth ? (
                  <>
                    <Menu.Item
                      icon={<IconLogin size={14} />}
                      onClick={openLoginHandler.open}
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
                    <Menu.Item
                      icon={<IconUserCircle size={14} />}
                      data-href="/account"
                      onClick={handleClickLinkButton}
                    >
                      Account
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconLogout size={14} />}
                      onClick={handleClickSignOut}
                    >
                      Sign Out
                    </Menu.Item>
                  </>
                )}
                {/* <Menu.Label>Setting</Menu.Label> */}
              </Menu.Dropdown>
            </Menu>

            <ActionIcon
              className={classes.userLinkButton_tablet}
              w={48}
              h={48}
              aria-label="user"
              onClick={handleClickUserButton}
            >
              <IconUser size={30} />
            </ActionIcon>

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
                  label={session?.user.carts?.length}
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
                    <IconShoppingBag size={30} />
                  </Link>
                </Indicator>
              </ActionIcon>
            ) : null}

            <Burger
              className={cx('header-buttons__burger')}
              color={openMenu ? 'black' : 'gray'}
              w={48}
              h={48}
              opened={openMenu}
              onClick={handleClickBurgurMenu}
            />
          </div>
        </nav>
      </MantineHeader>
      <SignIn opened={openLogin} onClose={openLoginHandler.close} />
      {/* Menu Drawer */}
      <Drawer
        position="top"
        lockScroll={false}
        withCloseButton={false}
        styles={{
          root: { top: '80px', zIndex: 99 },
          drawer: { top: '80px' },
        }}
        opened={openMenu}
        onClose={openMenuHandler.close}
      >
        <Box p="md" style={{ maxWidth: '1400px' }}>
          dasfsfasdf
        </Box>
      </Drawer>
      {/* User Drawer */}
      <Drawer
        position="top"
        lockScroll={false}
        withCloseButton={false}
        styles={{
          root: { top: '80px', zIndex: 99 },
          drawer: { top: '80px', height: 'auto' },
        }}
        opened={openUser}
        onClose={openUserHandler.close}
      >
        <Box p="2rem">
          <Text className="piic">PIIC</Text>
          <List c="gray" classNames={{ item: classes.userMenuItem }}>
            {isAuth ? (
              <>
                <List.Item icon={<IconTruckDelivery size={16} />}>
                  <Link className={cx('inherit')} href="/account/order">
                    Order
                  </Link>
                </List.Item>
                <List.Item icon={<IconHeart size={16} />}>
                  <Link className={cx('inherit')} href="/account/wishlist">
                    Wishlist
                  </Link>
                </List.Item>
                <List.Item icon={<IconUserCircle size={16} />}>
                  <Link className={cx('inherit')} href="/account">
                    Account
                  </Link>
                </List.Item>
                <List.Item
                  icon={<IconLogout size={16} />}
                  onClick={handleClickSignOut}
                >
                  Sign Out
                </List.Item>
              </>
            ) : (
              <>
                <List.Item icon={<IconLogin size={16} />}>
                  <Link className={cx('inherit')} href="/account/signin">
                    Sign In
                  </Link>
                </List.Item>
                <List.Item icon={<IconUserPlus size={16} />}>
                  <Link className={cx('inherit')} href="/account/new">
                    Sign Up
                  </Link>
                </List.Item>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default Header
