import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { AdminPanelSettings, FormatListBulleted, Login } from '@mui/icons-material'
import SettingsDialog from './SettingsDialog'
import { useCallback } from 'react'
import AboutDialog from './AboutDialog'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { Logo } from './Logo'

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
  const { data: session } = useSession()

  const handleClose = useCallback(() => {
    onClose(false)
  }, [onClose])

  const renderAdminLinks = useCallback(() => {
    if (session) {
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
  }, [session, handleClose])

  return (
    <>
      <Drawer open={open} onClose={() => onClose(false)}>
        <Box sx={{ width: 200 }}>
          <Logo />
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
          {!session && (
            <ListItemButton onClick={() => signIn()} disabled>
              <ListItemIcon>
                <Login />
              </ListItemIcon>
              <ListItemText primary="Logga in" />
            </ListItemButton>
          )}
          <SettingsDialog />
          <AboutDialog />
        </List>
      </Drawer>
    </>
  )
}

export default NavDrawer
