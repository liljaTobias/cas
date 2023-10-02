import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import NavDrawer from './NavDrawer'
import React, { useCallback, useState } from 'react'

import { TInfo } from '../types/api'
import { useRouter } from 'next/router'

interface NavigationProps {
  info: TInfo
}

const Navigation: React.FC<NavigationProps> = ({ info, children }) => {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false)
  const { name, logo_url, theme } = info

  const { pathname } = useRouter()

  const handleNavDrawToggle = useCallback(
    (open = !isNavDrawerOpen) => {
      setIsNavDrawerOpen(open)
    },
    [isNavDrawerOpen],
  )

  const headerName = pathname.split('/')[1]
  const styledName =
    headerName === 'sbar' ? headerName.toUpperCase() : headerName.charAt(0).toUpperCase() + headerName.slice(1)

  return (
    <>
      <AppBar position="static" color="primary" style={{ backgroundColor: theme.primaryColor }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleNavDrawToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            <Link href="/">{styledName}</Link>
          </Typography>
        </Toolbar>
        {children}
      </AppBar>
      <NavDrawer open={isNavDrawerOpen} onClose={handleNavDrawToggle} logoUrl={logo_url} />
    </>
  )
}

export default Navigation
