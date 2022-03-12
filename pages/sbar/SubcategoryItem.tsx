import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Divider, ListItemButton, ListItemSecondaryAction, ListItemText } from '@mui/material'
import styles from '../../styles/Sbar.module.css'

interface SubcategoryItemProps {
  name: string
  onClick: () => void
  isOpen: boolean
}

const SubcategoryItem: React.FC<SubcategoryItemProps> = ({ name, onClick, isOpen }) => {
  return (
    <div className={styles.subcategoryItem}>
      <ListItemButton onClick={onClick}>
        <ListItemText primary={name} primaryTypographyProps={{ sx: { fontWeight: '500' } }} />
        <ListItemSecondaryAction>{isOpen ? <ExpandLess /> : <ExpandMore />}</ListItemSecondaryAction>
      </ListItemButton>
      <Divider />
    </div>
  )
}

export default SubcategoryItem
