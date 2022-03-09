import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

interface Props {
  data: any
}

const Home: NextPage<Props> = ({ data }) => {
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('user') !== 'admin') {
      router.push('/login')
    } else {
      // TODO: Change to proper redirect
      router.push('/sbar/situation')
    }
  }, [router])

  return <></>
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
