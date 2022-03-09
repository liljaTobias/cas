import HelpIcon from '@mui/icons-material/Help'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { FormatListBulleted, Settings } from '@mui/icons-material'

interface NavigationProps {
  open: boolean
  /* eslint-disable-next-line */
  onClose: (arg0?: boolean) => void
  logoUrl: string
}

const NavDrawer: React.FC<NavigationProps> = ({ open = false, onClose, logoUrl }) => {
  return (
    <>
      <Drawer open={open} onClose={() => onClose(false)}>
        <Box sx={{ width: 200 }}>
          <img src={logoUrl} alt="text" />
          <Divider />
          <List>
            <Link href="/sbar/situation" passHref>
              <ListItemButton>
                <ListItemIcon>
                  <FormatListBulleted />
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
        <Divider variant="middle" />
        <List>
          <ListItemButton disabled>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Inställningar" />
          </ListItemButton>
          <ListItemButton disabled>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Om" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}

export default NavDrawer
