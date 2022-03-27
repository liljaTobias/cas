import { Button } from '@mui/material'
import { NextPage } from 'next'
import { getProviders, signIn } from 'next-auth/react'

interface SignInProps {
  providers: {
    [key: string]: { id: string; name: string }
  }
}

const SignIn: NextPage<SignInProps> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <Button onClick={() => signIn(provider.id)}>Logga in med {provider.name}</Button>
        </div>
      ))}
    </>
  )
}

export const getServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

export default SignIn
