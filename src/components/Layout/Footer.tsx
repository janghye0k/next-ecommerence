import React from 'react'
import {
  Box,
  Divider,
  Footer as MantineFooter,
  Stack,
  Text,
} from '@mantine/core'
import classNames from 'classnames/bind'
import Link from 'next/link'
import styles from './layout.module.scss'

const cx = classNames.bind(styles)

function Footer() {
  return (
    <MantineFooter
      className={cx('footer')}
      height=""
      p={24}
      sx={(theme) => ({
        background: theme.colors.gray[0],
      })}
    >
      <Stack className={cx('footer__wrapper')}>
        <Text c="dark" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          Customer Service: 1600-0000
        </Text>
        <Box className={cx('footer-info')}>
          <Box c="gray">
            <Text>consultation time: 11AM ~ 5PM (Sat & Sun closed)</Text>
            <Text>email: d0oR.hyeok@gmail.com</Text>
            <Text>email: d0or_hyeok@naver.com</Text>
          </Box>
          <Box>
            <Text>
              <Link href="/about/piic">
                About <span className="piic">PIIC</span>
              </Link>
            </Text>
            <Text>
              <Link href="/about/privacy-policy">Privacy policy</Link>
            </Text>
            <Text>
              <Link href="/about/terms">Terms</Link>
            </Text>
          </Box>
        </Box>
        <Box c="gray">
          <div className={cx('footer-desc__group')}>
            <span>Inc. PIIC</span>
            <Divider orientation="vertical" />
            <span>CEO : My name is CEO</span>
            <Divider orientation="vertical" />
            <span>Seoul-si OO-dong 000-00 OOOO </span>
          </div>
          <div className={cx('footer-desc__group')}>
            <span>Business Number : 000-00-00000</span>
            <Divider orientation="vertical" />
            <span>Sales registration number : 0000-00000</span>
          </div>
        </Box>
        <Divider />
        <Box c="gray" sx={{ fontSize: '.85em', textAlign: 'center' }}>
          Copyright ⓒ PIIC All Right Reserved.
        </Box>
      </Stack>
    </MantineFooter>
  )
}

export default Footer
