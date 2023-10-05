import { Collapse, List, ListItem } from '@mui/material'
import { minHeight } from '@mui/system'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import useSWR from 'swr'
import { FooterAd } from '../../components/ads/FooterAd'
import WithLoading from '../../components/WithLoading'
import { TCategory, TSubcategory } from '../../types/api'
import { Page } from '../../types/page'
import { fetcher } from '../../utils/api'
import ActionItem from './ActionItem'
import SubcategoryItem from './SubcategoryItem'

interface SbarProps {
  category: string
  subcategories: Array<{
    subcategory_id: string
    subcategory_name: string
  }>
}

const Sbar: Page<SbarProps> = () => {
  const [open, setOpen] = useState(Array.from({ length: 5 }, () => false))

  const { data } = useSWR(
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

  const handleOpenList = useCallback(
    (index: number) => {
      const newOpen = [...open]
      newOpen[index] = !newOpen[index]
      setOpen(newOpen)
    },
    [open],
  )

  return (
    <>
      <WithLoading isOpen={!data}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 200px)',
            justifyContent: 'space-between',
          }}
        >
          <List disablePadding>
            {subcategories.map((subcategory, index: number) => (
              <div key={subcategory.subcategory_id}>
                <SubcategoryItem
                  name={subcategory.subcategory_name}
                  onClick={() => handleOpenList(index)}
                  key={subcategory.subcategory_id}
                  isOpen={open[index]}
                />
                <Collapse in={open[index]}>
                  <List disablePadding>
                    {Object.entries(subcategory.actions).map(([key, value]) => (
                      <ActionItem key={key} value={value} />
                    ))}
                  </List>
                </Collapse>
              </div>
            ))}
            {/* <ListItem>
          </ListItem> */}
          </List>
          <FooterAd />
        </div>
      </WithLoading>
    </>
  )
}

export default Sbar
