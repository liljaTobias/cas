import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import NavDrawer from './NavDrawer'
import React, { useCallback, useState } from 'react'

import { TInfo } from '../types/api'

interface NavigationProps {
  info: TInfo
  children: React.ReactNode
}

const Navigation: React.FC<NavigationProps> = ({ info, children }) => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false)
  const { name, logo_url, theme } = info

  const handleNavDrawToggle = useCallback(() => {
    setIsNavDrawerOpen((prev) => !prev)
  }, [])

  return (
    <>
      <AppBar position="static" color="primary" style={{ backgroundColor: theme.primaryColor }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => handleNavDrawToggle()}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            <Link href="/">{name}</Link>
          </Typography>
        </Toolbar>
        {children}
      </AppBar>
      <NavDrawer open={isNavDrawerOpen} handleClose={handleNavDrawToggle} logoUrl={logo_url} />
    </>
  )
}

export default Navigation
