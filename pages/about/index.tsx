import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'

const PrivacyPolicy: FC = () => {
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h5">Integritetspolicy Behandling av personuppgifter - 17 Januari 2022</Typography>
      <Typography variant="body1">
        För oss är personlig integritet viktigt. Vi eftersträvar en hög nivå av dataskydd. I denna policy förklarar vi
        hur vi samlar in och använder personuppgifter. Vi beskriver också dina rättigheter och hur du kan göra dem
        gällande. Du är alltid välkommen att kontakta oss om du har frågor om hur vi behandlar dina personuppgifter.
        Kontaktuppgift står under rubrik personuppgiftsansvarig.
        <p>
          <b>Vad är en personuppgift och vad är en behandling av personuppgifter?</b>
          <br /> Personuppgifter är alla uppgifter om en levande fysisk person som direkt eller indirekt kan kopplas
          till den personen. Det handlar inte bara om namn och personnummer utan även om till exempel bilder och
          e-postadresser. Behandling av personuppgifter är allt som sker med personuppgifterna i IT-systemen, oavsett om
          det handlar om mobila enheter eller datorer. Det handlar om till exempel insamling, registrering,
          strukturering, lagring, bearbetning och överföring. I vissa fall kan även manuella register omfattas.
        </p>
        <p>
          <b>Personuppgiftsansvarig</b>
          <br /> För de behandlingar som sker inom vår verksamhet är Tommy Lilja personuppgiftsansvarig.
        </p>
        <p>
          <b>Vilka personuppgifter samlar vi in om dig och varför?</b>
          <br /> Vi behandlar i huvudsak ditt namn, personnummer, adress och kontaktuppgifter för fakturering. Vi
          behandlar dina personuppgifter för att i syftet kunna fullfölja Svenska lagar och regler.
          Personuppgiftsbiträden I en del situationer är det nödvändigt för oss att anlita andra parter. Till exempel
          olika IT- leverantörer. De är då personuppgiftsbiträden till oss. Vi kontrollerar personuppgiftsbiträden för
          att säkerställa att de garanterar säkerheten och sekretessen för personuppgifterna. När personuppgiftsbiträden
          anlitas sker det bara för de ändamål som är förenliga med de ändamål vi själva har för behandlingen.
        </p>
        <b>Aktörer som är självständigt personuppgiftsansvariga</b>
        <br /> Vi delar även dina personuppgifter med vissa andra aktörer som är självständigt personuppgiftsansvariga,
        till exempel myndigheter som Skatteverket, när vi är skyldiga att lämna ut sådana uppgifter med stöd av lag
        eller myndighetsbeslut. När dina personuppgifter delas med en aktör som är självständigt personuppgiftsansvarig
        gäller den organisationens integritetspolicy och personuppgiftshantering.
        <p>
          <b>Hur länge sparar vi dina personuppgifter?</b>
          <br /> Vi sparar aldrig dina personuppgifter längre än vad som är nödvändigt för respektive ändamål. Vissa
          uppgifter i bokföringen behöver på grund av lagstiftning till exempel sparas minst sju år.
        </p>
        <p>
          <b>Vad är dina rättigheter som registrerad?</b>
          <br /> Som registrerad har du enligt gällande lagstiftning ett antal rättigheter. Du har rätt till att få ett
          utdrag som visar vilka personuppgifter vi har registrerade om dig. Du kan begära rättelse av felaktiga
          uppgifter och i vissa fall radering.
        </p>
        Kontakta oss vid frågor om hur vi behandlar personuppgifter. Om du har frågor om hur vi behandlar
        personuppgifter kontakta Tommy Lilja Kvarnen 31495 Kinnared som är ansvarig för personuppgiftsfrågor. Vi kan
        komma att göra ändringar i vår integritetspolicy. Den senaste versionen av integritetspolicyn finns alltid här
        på webbplatsen.
      </Typography>
    </Box>
  )
}

export default PrivacyPolicy
