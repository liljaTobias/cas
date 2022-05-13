import { Button, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { TOganization } from '../../types/api'

const SbarTable = dynamic(() => import('../../components/forms/SbarTable'), { loading: () => <Skeleton /> })

interface AdminProps {
  organization: TOganization
}

const Admin: NextPage<AdminProps> = ({ organization }) => {
  const handleSave = (values: any) => {
    console.log(values)
    return
  }

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Paper>
          <Box sx={{ p: 1 }}>
            <Typography variant="h5" gutterBottom>
              Information
            </Typography>
            <Formik initialValues={{ ...organization }} onSubmit={handleSave}>
              {({ isSubmitting }) => (
                <Form>
                  <Stack spacing={2}>
                    <Field component={TextField} name="info.name" label="Namn" fullWidth />
                    <Stack direction="row" spacing={1}>
                      <Field component={TextField} name="info.logo_url" label="Logotyp" fullWidth disabled />
                      <Button variant="contained" color="primary">
                        Välj
                      </Button>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <Field component={TextField} name="info.theme.primaryColor" label="Primär" fullWidth />
                      <Field component={TextField} name="secondaryColor" label="Sekundär" fullWidth />
                    </Stack>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      Spara
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
        <SbarTable categories={organization.categories} />
      </Box>
    </>
  )
}

export default Admin

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.API_URL}/api/organizations/kommunkoping_v2`)
  const org: TOganization = await res.json()

  return { props: { organization: org } }
}
