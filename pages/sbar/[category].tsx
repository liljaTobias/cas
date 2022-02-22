import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import WithLoading from '../../components/WithLoading'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface TSubcategory {
  subcategory_id: string
  subcategory_name: string
  actions: {
    [key: string]: string
  }
}

interface TCategory {
  category_id: string
  category_name: string
  subcategories: TSubcategory[]
}

interface SbarProps {
  category: string
  subcategories: Array<{
    subcategory_id: string
    subcategory_name: string
  }>
}

const Sbar: NextPage<SbarProps> = () => {
  const [open, setOpen] = useState(Array.from({ length: 5 }, () => false))

  const { data, isValidating } = useSWR(
    `https://t1vy4habx7.execute-api.eu-north-1.amazonaws.com/organizations/kommunkoping_v2`,
    fetcher,
  )

  const router = useRouter()
  const { category } = router.query

  const subcategories = useMemo(() => {
    if (!data) return []
    return data.Item.categories.find((c: TCategory) => c.category_id === category).subcategories as TSubcategory[]
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
