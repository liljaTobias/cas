import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Page } from '../types/page'

type AppPropsWithLayout = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(<Component {...pageProps} />)
}

// @ts-ignore
export default appWithTranslation(MyApp)
