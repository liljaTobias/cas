import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Page } from '../types/page'
import Layout from '../components/Layout'
import { SessionProvider } from 'next-auth/react'
import Script from 'next/script'

type AppPropsWithLayout = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  return (
    <>
      <Script
        id="Adsense-id"
        async
        strategy="afterInteractive"
        onError={(e) => {
          console.error('Script failed to load', e)
        }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7303190163223512"
        crossOrigin="anonymous"
      />
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}

// @ts-ignore
export default appWithTranslation(MyApp)
