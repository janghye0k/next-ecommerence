import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  linkButton: {
    transition: 'ease .1s all',
    '&:hover': {
      backgroundColor: 'unset',
      color: theme.colors.dark,
    },
    '&:active': {
      transform: 'unset',
      backgroundColor: theme.colors.gray[0],
    },
  },
}))
