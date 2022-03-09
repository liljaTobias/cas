import { Divider, ListItemButton, ListItemText } from '@mui/material'
import styles from '../../styles/Sbar.module.css'

interface SubcategoryItemProps {
  name: string
  onClick: () => void
}

const SubcategoryItem: React.FC<SubcategoryItemProps> = ({ name, onClick }) => {
  return (
    <div className={styles.subcategoryItem}>
      <ListItemButton onClick={onClick}>
        <ListItemText primary={name as string} />
      </ListItemButton>
      <Divider />
    </div>
  )
}

export default SubcategoryItem