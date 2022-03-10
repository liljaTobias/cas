import { useUser } from '@auth0/nextjs-auth0'
import { Close, Logout, Settings } from '@mui/icons-material'
import {
  AppBar,
  Avatar,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { usePopupState, bindToggle, bindTrigger } from 'material-ui-popup-state/hooks'
import { useRouter } from 'next/router'
import { forwardRef, useCallback } from 'react'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const SettingsDialog = () => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'settingsDialog' })
  const router = useRouter()
  const { user } = useUser()

  const handleLogout = useCallback(() => {
    popupState.close()
    router.push('/api/auth/logout')
  }, [popupState, router])

  return (
    <>
      <ListItemButton {...bindTrigger(popupState)}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Inställningar" />
      </ListItemButton>
      <Dialog open={popupState.isOpen} fullScreen TransitionComponent={Transition}>
        <AppBar color="transparent" elevation={0} position="static">
          <Toolbar>
            <IconButton edge="start" {...bindToggle(popupState)}>
              <Close />
            </IconButton>
            <Typography variant="h6">Inställningar</Typography>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ backgroundColor: '#f5f5f5', padding: 0 }}>
          <List subheader={<ListSubheader sx={{ backgroundColor: 'transparent' }}>Konto</ListSubheader>}>
            <Divider />
            <ListItem
              secondaryAction={
                <IconButton color="error" onClick={handleLogout}>
                  <Logout />
                </IconButton>
              }
              sx={{ backgroundColor: 'white' }}
            >
              <ListItemAvatar>
                <Avatar alt="user">{user?.name?.slice(0, 1)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user?.name} />
            </ListItem>
            <Divider />
          </List>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SettingsDialog
