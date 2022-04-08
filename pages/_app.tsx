import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Page } from '../types/page'
import { SessionProvider } from 'next-auth/react'

type AppPropsWithLayout = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

// @ts-ignore
export default appWithTranslation(MyApp)
