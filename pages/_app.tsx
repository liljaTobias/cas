import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Page } from '../types/page'
import Layout from '../components/Layout'
import { SessionProvider } from 'next-auth/react'

type AppPropsWithLayout = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

// @ts-ignore
export default appWithTranslation(MyApp)
