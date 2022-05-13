import { Backdrop, CircularProgress } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

interface Props {
  data: any
}

const Home: NextPage<Props> = () => {
  const router = useRouter()
  // const { user } = useUser()

  useEffect(() => {
    router.push('/sbar/situation')
    // if (user) {
    // } else {
    //   router.push('/api/auth/login')
    // }
  }, [router])

  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Home
