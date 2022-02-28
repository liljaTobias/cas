import { Button, Dialog, DialogContent, DialogContentText, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface Props {
  data: any
}

const Home: NextPage<Props> = ({ data }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isDialogOpen, setIsDialogOpen] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('user') !== 'admin') {
      router.push('/login')
    } else {
      // TODO: Change to proper redirect
      router.push('/sbar/situation')
    }
  }, [router])

  return (
    <>
      <Dialog fullScreen open={isDialogOpen} TransitionComponent={Transition}>
        <DialogContent>
          <DialogContentText>Login</DialogContentText>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Home

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  }
}
