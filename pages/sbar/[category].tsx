import { Collapse, List } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useCallback, useState } from 'react'
import { TCategory, TOganization, TSubcategory } from '../../types/api'
import { Page } from '../../types/page'
import ActionItem from './ActionItem'
import SubcategoryItem from './SubcategoryItem'

import SbarLayout from '../../components/SbarLayout'

interface SbarProps {
  organization: TOganization
  category: string
  subcategories: Array<TSubcategory>
}

const Sbar: Page<SbarProps> = ({ organization, subcategories }) => {
  const [open, setOpen] = useState(Array.from({ length: 5 }, () => false))

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
      <SbarLayout organization={organization}>
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
        </List>
      </SbarLayout>
    </>
  )
}

export default Sbar

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`${process.env.API_URL}/api/organizations/kommunkoping_v2`)
  const org: TOganization = await res.json()

  const subcategories = org.categories.find((c: TCategory) => c.category_id === params?.category)?.subcategories || []

  return { props: { organization: org, category: params?.category, subcategories } }
}
