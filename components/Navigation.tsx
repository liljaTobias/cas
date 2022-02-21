import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

interface NavigationProps {
  info: {
    name: string
    logo_url: string
    theme: {
      primaryColor: string
    }
  }
}

const Navigation: React.FC<NavigationProps> = ({ info, children }) => {
  const { name, logo_url, theme } = info
  return (
    <AppBar position="static" color="primary" style={{ backgroundColor: theme.primaryColor }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit">
          {name}
        </Typography>
        <img src={logo_url} alt={name} />
      </Toolbar>
      {children}
    </AppBar>
  )
}

export default Navigation
