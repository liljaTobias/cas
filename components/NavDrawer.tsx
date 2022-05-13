import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { AdminPanelSettings, FormatListBulleted, Login } from '@mui/icons-material'
import SettingsDialog from './SettingsDialog'
import { useCallback } from 'react'
import AboutDialog from './AboutDialog'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'

interface NavigationProps {
  open: boolean
  handleClose: () => void
  logoUrl: string
}

const NavDrawer: React.FC<NavigationProps> = ({ open = false, handleClose, logoUrl }) => {
  const { data: session } = useSession()

  // const renderAdminLinks = useCallback(() => {
  //   if (session) {
  //     return (
  //       <Link href="/admin" passHref>
  //         <ListItemButton onClick={handleClose}>
  //           <ListItemIcon>
  //             <AdminPanelSettings />
  //           </ListItemIcon>
  //           <ListItemText primary="Admin" />
  //         </ListItemButton>
  //       </Link>
  //     )
  //   }
  // }, [session, handleClose])

  return (
    <>
      <Drawer open={open} onClose={handleClose}>
        <Box sx={{ width: 200 }}>
          <Image src={logoUrl} alt="logo" width={200} height={75} />
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
            {/* {renderAdminLinks()} */}
          </List>
        </Box>
        <Divider variant="middle" />
        <List>
          {/* {!session && ( */}
          <ListItemButton onClick={() => signIn()}>
            <ListItemIcon>
              <Login />
            </ListItemIcon>
            <ListItemText primary="Logga in" />
          </ListItemButton>
          {/* )} */}
          <SettingsDialog />
          <AboutDialog />
        </List>
      </Drawer>
    </>
  )
}

export default NavDrawer
