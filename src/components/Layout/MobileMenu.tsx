import { Box, Drawer, Stack, Text } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import Link from 'next/link'
import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import categorys from 'public/data/category.json'
import useLayoutStore from '@/store/layout.store'
import { scaleY } from '@/common/transition'
import styles from './layout.module.scss'

type MobileMenuProsp = {
  opened: boolean
  onClose: () => void
}

type IStep = 'men' | 'women' | 'kids'

const cx = classNames.bind(styles)

function MobileMenu({ opened, onClose }: MobileMenuProsp) {
  const [step, setStep] = useLayoutStore((state) => [state.step, state.setStep])

  function handleClickStepButton(event: React.MouseEvent<HTMLElement>) {
    setStep((event.currentTarget.dataset.step as IStep) || 'main')
  }

  useEffect(() => {
    return () => {
      setStep('main')
    }
  }, [opened, setStep])

  return (
    <>
      {/* Mobile Menu Drawer */}
      <Drawer
        classNames={{ drawer: cx('header-drawer__menu', 'header-drawer') }}
        position="top"
        withCloseButton={false}
        lockScroll={false}
        transition={scaleY}
        styles={(theme) => ({
          root: { top: '80px', zIndex: 99 },
          drawer: {
            top: '80px',
            color: theme.colors.gray[6],
            backgroundColor: theme.colors.gray[0],
            height: 'calc(100% - 80px)',
            overflowY: 'auto',

            '& [role="tab"]': {
              transition: 'ease all .2s',
              '&.tab__normal:hover': {
                color: theme.colors.dark,
              },
            },
          },
        })}
        opened={opened}
        onClose={onClose}
      >
        <Box pos="relative">
          {/* Main Menu */}
          <Stack
            m="2rem 3rem"
            role="tablist"
            data-fade={step !== 'main' ? 'out' : 'in'}
          >
            <Text role="tab" c="main">
              <Link href="/shop/sale">
                <span>SALE</span>
              </Link>
            </Text>
            <Text role="tab" c="sub">
              <Link href="/shop/best">
                <span>BEST</span>
              </Link>
            </Text>
            {Object.keys(categorys).map((mainKey) => (
              <Text
                className="tab__normal"
                key={mainKey}
                role="tab"
                data-step={mainKey}
                onClick={handleClickStepButton}
              >
                <span>{mainKey.toUpperCase()}</span>
                <IconChevronRight />
              </Text>
            ))}
          </Stack>
          {/* Sub Menu */}

          <Stack
            m="2rem 3rem"
            role="tablist"
            data-fade={step !== 'main' ? 'in' : 'out'}
          >
            {step === 'main'
              ? null
              : Object.keys(categorys[step as IStep]).map((subKey) => (
                  <Text className="tab__normal" role="tab" key={subKey}>
                    <Link href={`/shop/${step}/${subKey}`}>
                      <span>{subKey.toUpperCase()}</span>
                    </Link>
                  </Text>
                ))}
          </Stack>
        </Box>
      </Drawer>
    </>
  )
}

export default MobileMenu
