import { Divider, ListItemButton, ListItemText } from '@mui/material'
import styles from '../../styles/Sbar.module.css'

interface ActionItemProps {
  value: string
}

const ActionItem: React.FC<ActionItemProps> = ({ value }) => {
  return (
    <div className={styles.actionItem}>
      <ListItemButton>
        <ListItemText primary={value as string} />
      </ListItemButton>
      <Divider />
    </div>
  )
}

export default ActionItem
