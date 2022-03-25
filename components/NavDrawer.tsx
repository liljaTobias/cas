import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { AdminPanelSettings, FormatListBulleted, Login } from '@mui/icons-material'
import SettingsDialog from './SettingsDialog'
import { useUser } from '@auth0/nextjs-auth0'
import { useCallback } from 'react'
import AboutDialog from './AboutDialog'

// Prototype
const navigationRoutes = {
  common: [
    {
      label: 'SBAR',
      href: '/sbar/situation',
      icon: FormatListBulleted,
      permission: 'all',
    },
  ],
  misc: [
    {
      label: 'Admin',
      href: '/admin',
      icon: AdminPanelSettings,
      permission: 'admin',
    },
  ],
}

interface NavigationProps {
  open: boolean
  /* eslint-disable-next-line */
  onClose: (arg0?: boolean) => void
  logoUrl: string
}

const NavDrawer: React.FC<NavigationProps> = ({ open = false, onClose, logoUrl }) => {
  const { user } = useUser()

  const handleClose = useCallback(() => {
    onClose(false)
  }, [onClose])

  const renderAdminLinks = useCallback(() => {
    if (user) {
      return (
        <Link href="/admin" passHref>
          <ListItemButton onClick={handleClose}>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItemButton>
        </Link>
      )
    }
  }, [user, handleClose])

  return (
    <>
      <Drawer open={open} onClose={() => onClose(false)}>
        <Box sx={{ width: 200 }}>
          <img src={logoUrl} alt="text" width={200} />
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
            {renderAdminLinks()}
          </List>
        </Box>
        <Divider variant="middle" />
        <List>
          {!user && (
            <Link href="/api/auth/login" passHref>
              <ListItemButton onClick={handleClose}>
                <ListItemIcon>
                  <Login />
                </ListItemIcon>
                <ListItemText primary="Logga in" />
              </ListItemButton>
            </Link>
          )}
          <SettingsDialog />
          <AboutDialog />
        </List>
      </Drawer>
    </>
  )
}

export default NavDrawer
