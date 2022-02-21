import useSWR from 'swr'
import Navigation from './Navigation'
import SbarTabs from './SbarTabs'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Layout: React.FC = ({ children }) => {
  const { data, error } = useSWR(
    'https://t1vy4habx7.execute-api.eu-north-1.amazonaws.com/organizations/kommunkoping_v2',
    fetcher,
  )

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="layout">
      <Navigation info={data.Item.info}>
        <SbarTabs categories={data.Item.categories} />
      </Navigation>
      {children}
    </div>
  )
}

export default Layout
