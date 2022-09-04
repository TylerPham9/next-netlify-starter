import '../styles/globals.css'

import { ChakraProvider, theme } from '@chakra-ui/react'
// import {componentDidCatch} from 'react'
import type { AppProps } from 'next/app'

function Application({ Component, pageProps }: AppProps) {
  return (
    // TODO: Implement theme and colorModeManager
    // <ChakraProvider theme={theme} colorModeManager={colorModeManager}></ChakraProvider>
    // <ErrorBoundary FallbackComponent={ErrorFallback}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <div className="pattern"></div>
    </ChakraProvider>
    // </ErrorBoundary>
  )
}

export default Application
