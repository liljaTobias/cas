import Head from 'next/head'
import { TOganization } from '../types/api'
import Navigation from './Navigation'
import SbarTabs from './SbarTabs'

type SbarLayoutProps = {
  organization: TOganization
  children: React.ReactNode
}

const SbarLayout: React.FC<SbarLayoutProps> = ({ organization, children }) => {
  return (
    <>
      <Head>
        <title>CAS - {organization.info.name}</title>
        <meta name="description" content="CAS" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content={organization.info.theme.primaryColor} />
      </Head>
      <div className="layout">
        <Navigation info={organization.info}>
          <SbarTabs categories={organization.categories} />
        </Navigation>
        {children}
      </div>
    </>
  )
}

export default SbarLayout
