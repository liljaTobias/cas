import {
  Alert,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Typography,
} from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import { TOrganizationsItems } from '../../types/api'
import { fetcher } from '../../utils/api'

import styles from '../../styles/Login.module.css'
import Image from 'next/image'

import logoImage from '../../public/icon-144x144.png'

interface LoginProps {}

const Login: NextPage<LoginProps> = () => {
  const [organizationSelectValue, setOrganizationSelectValue] = useState('kommunkoping_v2')
  const router = useRouter()

  const [isErrorOpen, setIsErrorOpen] = useState(false)

  const { data, error } = useSWR<TOrganizationsItems>(
    `https://t1vy4habx7.execute-api.eu-north-1.amazonaws.com/organizations`,
    fetcher,
  )

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
      setIsErrorOpen(true)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>CAS - Login</title>
      </Head>
      <div className={styles.main}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Image src={logoImage} alt="Logo image" />
          <Typography variant="h1" fontSize={32}>
            Välkommen till CAS
          </Typography>
          <Typography variant="body2" gutterBottom>
            Börja med att välja din organisation
          </Typography>
          <FormControl fullWidth>
            <Select
              autoWidth
              value={organizationSelectValue}
              disabled={!data}
              onChange={handleChange}
              className={styles.input}
            >
              {data?.Items.map((item) => (
                <MenuItem
                  key={item.organization_id}
                  value={item.organization_id}
                  disabled={item.organization_id !== 'kommunkoping_v2'}
                >
                  {item.info ? item.info.name : item.organization_name}
                </MenuItem>
              ))}
              {/* <MenuItem value="kommunkoping_v2">Kommunköping</MenuItem> */}
            </Select>
            <Button variant="contained" onClick={() => handleLogin()} className={styles.input}>
              Gå vidare
            </Button>
            <Button variant="contained" color="error" onClick={fakeLogin}>
              DEBUG: LOGGA IN
            </Button>
          </FormControl>
        </Grid>
      </div>
      <Snackbar open={isErrorOpen} autoHideDuration={6000} onClose={() => setIsErrorOpen(false)}>
        <Alert severity="error" onClose={() => setIsErrorOpen(false)}>
          Ingen användare kunde hittas
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Login
