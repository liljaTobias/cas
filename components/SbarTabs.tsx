import { Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

interface SbarProps {
  categories: Array<{
    category_id: string
    category_name: string
  }>
}

const SbarTabs: React.FC<SbarProps> = ({ categories }) => {
  const router = useRouter()
  const { category } = router.query
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (category) {
      setActiveTab(categories.findIndex((c) => c.category_id === category))
    }
  }, [category, categories])

  const handleTabChange = useCallback(
    (newValue) => {
      setActiveTab(newValue)
      router.push(`/sbar/${categories[newValue].category_id}`)
    },
    [categories, router],
  )

  return (
    <>
      <Tabs value={activeTab} onChange={(event, newValue) => handleTabChange(newValue)}>
        {categories.map((category_s) => (
          <Tab key={category_s.category_id} label={category_s.category_name} />
        ))}
      </Tabs>
    </>
  )
}

export default SbarTabs
