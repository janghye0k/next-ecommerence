import React from 'react'
import { MantineProvider as MantineCore } from '@mantine/core'

type Colors = {
  [key: string]: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ]
}

const colors: Colors = {
  brown: [
    '#EFEBE9',
    '#D7CCC8',
    '#BCAAA4',
    '#A1887F',
    '#8D6E63',
    '#795548',
    '#6D4C41',
    '#5D4037',
    '#4E342E',
    '#3E2723',
  ],
  bluegrey: [
    '#ECEFF1',
    '#CFD8DC',
    '#B0BEC5',
    '#90A4AE',
    '#78909C',
    '#607D8B',
    '#546E7A',
    '#455A64',
    '#37474F',
    '#263238',
  ],
}

function MantineProvider({ children }: any) {
  return (
    <MantineCore
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors,
        colorScheme: 'light',
        primaryColor: 'teal',
      }}
    >
      {children}
    </MantineCore>
  )
}

export default MantineProvider
