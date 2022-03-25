import { Close, Help } from '@mui/icons-material'
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { usePopupState, bindToggle, bindTrigger } from 'material-ui-popup-state/hooks'
import { forwardRef, useState } from 'react'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const AboutDialog = () => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'settingsDialog' })

  return (
    <>
      <ListItemButton {...bindTrigger(popupState)}>
        <ListItemIcon>
          <Help />
        </ListItemIcon>
        <ListItemText primary="Om" />
      </ListItemButton>
      <Dialog open={popupState.isOpen} fullScreen TransitionComponent={Transition}>
        <AppBar color="transparent" elevation={0} position="static">
          <Toolbar>
            <IconButton edge="start" {...bindToggle(popupState)}>
              <Close />
            </IconButton>
            <Typography variant="h6">Om</Typography>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ padding: '0px 20px' }}>
          <Stack spacing={2}>
            <Typography variant="h5">CAS</Typography>
            <Typography variant="body1">
              CAS är en innovativ och skalbar digital plattform som ger hälso- och sjukvården möjlighet att erbjuda en
              effektiv kommunikationsstrategi mellan olika befattningar inom organisationen. Plattformen består av ett
              intuitivt webbgränssnitt för vårdgivaren och en användarvänlig webbportal där vårdgivaren under strikt
              kontroll och med korrekt behörigheter själv kan anpassa sitt eget strategiska informationsinnehåll.
            </Typography>
            <Typography variant="body1">
              En uppsättning processer och aktiviteter ingår som en webbapplikation där vi tänkt på den mobila
              tillgängligheten och sett till att vår applikation ser bra ut på mobila enheter. Vi har möjligheter i
              samarbete, att utveckla nya funktioner inom ramen för de som moderna webbläsare tillhandahåller. Dessa
              funktioner öppnar för nya möjligheter och gör samtidigt produkten mer anpassad för verksamhet och
              organisation.
            </Typography>
            <Divider />
            <Typography variant="h5">SBAR</Typography>
            <Typography variant="body1">
              Rapporteringsstöd enligt SBAR Denna sida innehåller ett antal symtombilder. För att sjuksköterskan ska få
              en så fullständig bild som möjligt av patientens tillstånd finns ett antal frågor för varje symtombild.
              Dessa förväntas bas-personal så långt som möjligt kunna svara på när sjuksköterska kontaktas.
              Bedömningsstödet gör att samma frågor ställs, oavsett vilken sjuksköterska som kontaktas, samtidigt som
              det utgör ett lärande för baspersonal i iakttagande av patient.
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AboutDialog
