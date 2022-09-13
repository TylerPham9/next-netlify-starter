import { Box, useToken } from '@chakra-ui/react'
import Head from 'next/head'
import type { ReactNode } from 'react'
import React from 'react'

const Main = ({ children }: MainProps) => {
  // const [red100] = useToken('colors', ['red.100'])
  const accentColor = useToken('colors', 'red.200')
  const fillOpacity = '0.4'

  return (
    <Box
      // backgroundColor={'blue.500'}
      backgroundImage={`url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent(
        accentColor,
      )}' fill-opacity='${fillOpacity}'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Cat Site" />
        <meta name="author" content="Tyler Pham" />
        <title>Lots of Cats</title>
      </Head>

      {children}
    </Box>
  )
}

interface MainProps {
  children?: ReactNode
}

export default Main
