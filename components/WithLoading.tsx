import { Backdrop, CircularProgress } from '@mui/material'

interface WithLodingProps {
  isOpen: boolean
}

const WithLoading: React.FC<WithLodingProps> = ({ isOpen, children }) => {
  if (isOpen) {
    return (
      <Backdrop open={isOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }
  return <>{children}</>
}

export default WithLoading
