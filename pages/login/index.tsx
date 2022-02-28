import { Button, Grid, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface LoginProps {}

const Login: NextPage<LoginProps> = () => {
  const [organizationSelectValue, setOrganizationSelectValue] = useState('kommunkoping_v2')
  const router = useRouter()

  const { data, error } = useSWR(`https://t1vy4habx7.execute-api.eu-north-1.amazonaws.com/organizations`, fetcher)

  const handleChange = (event: SelectChangeEvent) => {
    setOrganizationSelectValue(event.target.value as string)
  }

  const fakeLogin = () => {
    localStorage.setItem('user', 'admin')
  }

  const handleLogin = () => {
    const isLoggedIn = localStorage.getItem('user')

    if (isLoggedIn) {
      router.push('/sbar/situation')
    } else {
      alert('No permission')
    }
  }

  return (
    <>
      <Grid container alignItems="center" justifyContent="center" direction="column">
        <Typography variant="h2">Login</Typography>
        <Typography variant="body1">Välj din organisation</Typography>
        <Select value={organizationSelectValue} disabled={!data} onChange={handleChange}>
          {data?.Items.map((item) => (
            <MenuItem key={item.organization_id} value={item.organization_id}>
              {item.info ? item.info.name : item.organization_name}
            </MenuItem>
          ))}
          {/* <MenuItem value="kommunkoping_v2">Kommunköping</MenuItem> */}
        </Select>
        <Button variant="contained" onClick={() => handleLogin()}>
          Gå vidare
        </Button>
        <Button color="error" onClick={fakeLogin}>
          DEBUG: LOGGA IN
        </Button>
      </Grid>
    </>
  )
}

export default Login
