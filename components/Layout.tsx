import { UserProvider } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '../utils/api'
import Navigation from './Navigation'
import SbarTabs from './SbarTabs'

const Layout: React.FC = ({ children }) => {
  const { data, error } = useSWR(
    'https://t1vy4habx7.execute-api.eu-north-1.amazonaws.com/organizations/kommunkoping_v2',
    fetcher,
  )

  const router = useRouter()
  const { pathname } = router

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Head>
        <title>CAS - {data.Item.info.name}</title>
        <meta name="description" content="CAS" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content={data.Item.info.theme.primaryColor} />
      </Head>
      <div className="layout">
        <UserProvider>
          <Navigation info={data.Item.info}>
            {pathname.includes('/sbar') && <SbarTabs categories={data.Item.categories} />}
          </Navigation>
        </UserProvider>
        {children}
      </div>
    </>
  )
}

export default Layout
