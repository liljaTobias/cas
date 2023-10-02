import { Typography } from '@mui/material'
import Image from 'next/image'

export const Logo = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Image src={'/icon-128x128.png'} width={100} height={100} alt="logo" />
      <Typography variant="h4">CAS</Typography>
    </div>
  )
}
