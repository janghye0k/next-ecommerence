import {
  Alert,
  Anchor,
  Button,
  Divider,
  LoadingOverlay,
  Modal,
  ModalProps,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import Google from 'public/images/google.png'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from '@mantine/form'
import { signIn } from 'next-auth/react'
import { IconAlertCircle } from '@tabler/icons'
import { useDisclosure } from '@mantine/hooks'
import useLayoutStore from '@/store/layout.store'

type SignInProps = Omit<ModalProps, 'title' | 'size'>

/**
 * @description Modal, Sign in
 * @description 모달, 로그인
 */
function SignIn({ onClose, ...props }: SignInProps) {
  const formRef = useRef<HTMLFormElement>(null)

  const { isLoading, loadingHandler } = useLayoutStore()

  const [isAlert, setIsAlert] = useState(false)

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      // email: (value) => {
      //   const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      //   return regex.test(value) ? null : 'Invalid Email'
      // },
      username: (value) => {
        return value.length < 6
          ? 'Username must be at least 6 characters long'
          : null
      },
      password: (value) => {
        return value.length < 6
          ? 'Password must be at least 6 characters long.'
          : null
      },
    },
  })

  /** 아이디 비밀번호 방식 로그인 */
  async function handleClickCreadentialSignin() {
    const { hasErrors } = form.validate()
    if (hasErrors) return
    loadingHandler.open()

    // if don't have validate error, do sign in action
    // 유효성 검사를 통과하면 로그인을 수행한다.
    const result = await signIn('credentials', {
      redirect: false,
      callbackUrl: '',
      ...form.values,
    })

    loadingHandler.close()
    const { ok, error } = result || {}
    // if fail show alert
    // 실패하면 경고창을 보여준다.
    if (!ok || !!error) return setIsAlert(true)
    return onClose()
  }

  /** 소셜로그인 (구글) */
  async function handleClickGoogleSignIn() {
    await signIn('google', { callbackUrl: '', redirect: false })
    return onClose()
  }

  useEffect(() => {
    // When modal closed, reset all values
    // 모달이 닫히면 모든 값들을 초기화한다.
    return () => {
      form.reset()
      setIsAlert(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.opened])

  return (
    <Modal
      {...props}
      onClose={onClose}
      size="380px"
      title={
        <Title order={4} align="center">
          Sign In
        </Title>
      }
    >
      <Paper>
        <Stack mx="auto">
          {isAlert ? (
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Sign in failed"
              color="red"
            >
              Please check your username or password
            </Alert>
          ) : null}
          <form ref={formRef}>
            <TextInput
              id="username"
              label="Username"
              type="username"
              placeholder="Your username"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your Password"
              autoComplete="false"
              {...form.getInputProps('password')}
            />
          </form>
          <Button type="submit" onClick={handleClickCreadentialSignin}>
            Sign in
          </Button>

          <Divider label="OR" labelPosition="center" />

          <Button
            id="password"
            type="button"
            variant="outline"
            color="dark"
            styles={(theme) => ({
              root: {
                borderColor: theme.colors.gray[4],
                borderWidth: '1px',
                transition: 'ease all .1s',
                '&:hover': {
                  borderColor: theme.colors.gray[6],
                  background: 'none',
                },
              },
            })}
            onClick={handleClickGoogleSignIn}
          >
            <Image src={Google} alt="google logo" width={30} height={30} />
            Sign in with Google
          </Button>
          <Stack spacing={4}>
            <Text ta="center" fz="sm">
              If you don&apos;t have account?{' '}
              <Link href="/account/new" onClick={onClose}>
                <Anchor
                  component="span"
                  color="indigo"
                  sx={{ fontWeight: 'bold' }}
                >
                  Sign up
                </Anchor>
              </Link>{' '}
              <span className="piic">PIIC!</span>
            </Text>
            <Text ta="center" fz="sm">
              Forget password,{' '}
              <Link href="/account/password" onClick={onClose}>
                <Anchor
                  component="span"
                  color="indigo"
                  sx={{ fontWeight: 'bold' }}
                >
                  reset password
                </Anchor>
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  )
}

export default SignIn
