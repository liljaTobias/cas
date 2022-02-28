import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactElement, useMemo, useState } from 'react'
import useSWR from 'swr'
import Layout from '../../components/Layout'
import WithLoading from '../../components/WithLoading'
import { TCategory, TSubcategory } from '../../types/api'
import { Page } from '../../types/page'
import { fetcher } from '../../utils/api'

interface SbarProps {
  category: string
  subcategories: Array<{
    subcategory_id: string
    subcategory_name: string
  }>
}

const Sbar: Page<SbarProps> = () => {
  const [open, setOpen] = useState(Array.from({ length: 5 }, () => false))

  const { data, isValidating } = useSWR(
    `https://t1vy4habx7.execute-api.eu-north-1.amazonaws.com/organizations/kommunkoping_v2`,
    fetcher,
  )

  const router = useRouter()
  const { category } = router.query

  const subcategories = useMemo(() => {
    if (!data) return []
    return (
      (data.Item.categories.find((c: TCategory) => c.category_id === category).subcategories as TSubcategory[]) || []
    )
  }, [category, data])

  const handleOpenList = (index: number) => {
    const newOpen = [...open]
    newOpen[index] = !newOpen[index]
    setOpen(newOpen)
  }

  return (
    <>
      <WithLoading isOpen={isValidating}>
        <List>
          {subcategories.map((subcategory, index: number) => (
            <>
              <ListItemButton key={subcategory.subcategory_id} onClick={() => handleOpenList(index)}>
                <ListItemText primary={subcategory.subcategory_name} />
              </ListItemButton>
              <Collapse in={open[index]}>
                <List disablePadding>
                  {Object.entries(subcategory.actions).map(([key, value]) => (
                    <ListItemButton key={key}>
                      <ListItemText primary={value as string} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </>
          ))}
        </List>
      </WithLoading>
    </>
  )
}

export default Sbar

Sbar.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
