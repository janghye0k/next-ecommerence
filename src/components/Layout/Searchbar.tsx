import { Box } from '@mantine/core'
import React from 'react'

interface SearchbarProps {
  opened: boolean
  onClose: () => void
}

function Searchbar({ opened, onClose }: SearchbarProps) {
  return <Box>Searchbar</Box>
}

export default Searchbar
