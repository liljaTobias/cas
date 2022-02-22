import HelpIcon from '@mui/icons-material/Help'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'

interface NavigationProps {
  open: boolean
  /* eslint-disable-next-line */
  onClose: (arg0?: boolean) => void
}

const NavDrawer: React.FC<NavigationProps> = ({ open = false, onClose }) => {
  return (
    <>
      <Drawer open={open} onClose={() => onClose(false)}>
        <Box sx={{ width: 250 }}>
          <List>
            <Link href="/sbar/situation" passHref>
              <ListItemButton>
                <ListItemIcon>
                  <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="SBAR" />
              </ListItemButton>
            </Link>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Övrigt" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default NavDrawer
