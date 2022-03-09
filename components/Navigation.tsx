import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import NavDrawer from './NavDrawer'
import React, { useCallback, useState } from 'react'
import { MoreVert } from '@mui/icons-material'

import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks'
import { useRouter } from 'next/router'
import { TInfo } from '../types/api'

interface NavigationProps {
  info: TInfo
}

const Navigation: React.FC<NavigationProps> = ({ info, children }) => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false)
  const { name, logo_url, theme } = info
  const router = useRouter()

  const popupState = usePopupState({ variant: 'popover', popupId: 'demo-popup-menu' })

  const handleNavDrawToggle = useCallback(
    (open = !isNavDrawerOpen) => {
      setIsNavDrawerOpen(open)
    },
    [isNavDrawerOpen],
  )

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user')
    popupState.close()
    router.push('/login')
  }, [popupState, router])

  return (
    <>
      <AppBar position="static" color="primary" style={{ backgroundColor: theme.primaryColor }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleNavDrawToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            <Link href="/">{name}</Link>
          </Typography>
          <IconButton edge="end" {...bindTrigger(popupState)}>
            <MoreVert />
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={handleLogout} disabled>
              Logga ut (disabled)
            </MenuItem>
          </Menu>
        </Toolbar>
        {children}
      </AppBar>
      <NavDrawer open={isNavDrawerOpen} onClose={handleNavDrawToggle} logoUrl={logo_url} />
    </>
  )
}

export default Navigation
