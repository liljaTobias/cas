import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Page } from '../types/page'
import { UserProvider } from '@auth0/nextjs-auth0'
import Layout from '../components/Layout'

type AppPropsWithLayout = AppProps & {
  Component: Page
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // const getLayout = Component.getLayout ?? ((page) => page)
  // return getLayout(
  //   <UserProvider>
  //     <Component {...pageProps} />
  //   </UserProvider>,
  // )
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}

// @ts-ignore
export default appWithTranslation(MyApp)
