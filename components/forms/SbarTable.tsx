import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import {
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useCallback, useState } from 'react'
import { TCategory, TSubcategory } from '../../types/api'

interface SbarProps {
  categories: Array<TCategory>
}

const SbarTable: React.FC<SbarProps> = ({ categories }) => {
  const [open, setOpen] = useState(Array.from({ length: 5 }, () => false))

  const handleOpenList = useCallback(
    (index: number) => {
      const newOpen = [...open]
      newOpen[index] = !newOpen[index]
      setOpen(newOpen)
    },
    [open],
  )

  const renderHeaders = useCallback(() => {
    return (
      <TableRow>
        <TableCell />
        <TableCell>Kategori</TableCell>
        <TableCell>Underkategorier</TableCell>
        <TableCell>Åtgärder</TableCell>
        <TableCell />
      </TableRow>
    )
  }, [])

  const getSubcategoryLabel = (subcategories: Array<TSubcategory>) => {
    return subcategories.map((subcategory) => subcategory.subcategory_name).join(', ')
  }

  const getActionsLabel = (subcategories: Array<TSubcategory>) => {
    return Object.entries(subcategories[0].actions)[0][1].slice(0, 20) + '...'
  }

  const getActionsBySubcategory = (subcategory: TSubcategory) => {
    return Object.entries(subcategory.actions).map(([key, value]) => <li key={key}>{value}</li>)
  }

  const renderSubTable = useCallback((subcategories: Array<TSubcategory>) => {
    return subcategories.map((subcategory) => (
      <TableRow key={subcategory.subcategory_id}>
        <TableCell>{subcategory.subcategory_name}</TableCell>
        <TableCell>{getActionsBySubcategory(subcategory)}</TableCell>
      </TableRow>
    ))
  }, [])

  const renderRows = useCallback(
    (categories: Array<TCategory>) => {
      return categories.map((category, index) => (
        <>
          <TableRow key={category.category_id}>
            <TableCell>
              <IconButton onClick={() => handleOpenList(index)}>
                {open[index] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            </TableCell>
            <TableCell>{category.category_name}</TableCell>
            <TableCell>{getSubcategoryLabel(category.subcategories)}</TableCell>
            <TableCell>{getActionsLabel(category.subcategories)}</TableCell>
            <TableCell>
              <Button>Ändra</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
              <Collapse in={open[index]} timeout="auto" unmountOnExit>
                <Box m={2}>
                  <Typography variant="h6">Detaljvy</Typography>
                  <Table size="small">{renderSubTable(category.subcategories)}</Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </>
      ))
    },
    [open, renderSubTable, handleOpenList],
  )

  return (
    <>
      <Paper>
        <Box sx={{ p: 1, marginTop: '10px' }}>
          <Typography variant="h5">SBAR (Work in Progress)</Typography>
          <Table>
            <TableHead>{renderHeaders()}</TableHead>
            <TableBody>{renderRows(categories)}</TableBody>
          </Table>
        </Box>
      </Paper>
    </>
  )
}

export default SbarTable
