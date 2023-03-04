import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function ReactQueryProvider({ children, dehydratedState }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Hydrate state={dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
