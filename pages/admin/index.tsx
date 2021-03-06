import { Button, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-mui'
import { NextPage } from 'next'
import SbarTable from '../../components/forms/SbarTable'

import { TOganization } from '../../types/api'

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
  const res = await fetch(`https://t1vy4habx7.execute-api.eu-north-1.amazonaws.com/organizations/kommunkoping_v2`)
  const data = await res.json()
  return { props: { organization: data.Item } }
}
