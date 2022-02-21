import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
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

const Sbar: NextPage<SbarProps> = ({ category }) => {
  const [open, setOpen] = useState(Array.from({ length: 5 }, () => false))

  const { data, isValidating } = useSWR(
    `https://t1vy4habx7.execute-api.eu-north-1.amazonaws.com/organizations/kommunkoping_v2`,
    fetcher,
  )

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

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // const { category = '' } = params
  // const res = await fetch(`https://t1vy4habx7.execute-api.eu-north-1.amazonaws.com/organizations/kommunkoping_v2`)
  // const json = await res.json()
  // const subcategories = json.Item.categories.find((c) => c.category_id === category).subcategories
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'header'])),
      category: (params?.category as string) || 'situation',
      subcategories: [],
    },
  }
}

export default Sbar
