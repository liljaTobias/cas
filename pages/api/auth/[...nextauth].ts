import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'

import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { DynamoDBAdapter } from '@next-auth/dynamodb-adapter'
import { signIn } from 'next-auth/react'

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_SERVICE_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SERVICE_SECRET_KEY as string,
  },
  region: process.env.AWS_SERVICE_REGION,
}

const client = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
})

const getUserByEmail = async (email: string | undefined | null) => {
  const data = await fetch(`${process.env.API_URL}/api/users`, {
    method: 'POST',
    body: JSON.stringify({ email: email }),
    headers: { 'Content-Type': 'application/json' },
  })

  const userRes = await data.json()

  return userRes
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Not using JWT at the moment
      if (user && user.email) {
        const userRes = await getUserByEmail(user.email)
        token.name = userRes.name
        token.role = userRes.role
      }

      token.userRole = user?.role || 'guest'
      return token
    },
    async signIn({ user, email }) {
      const userRes = await getUserByEmail(user.email)

      if (userRes.error) {
        return false
      }

      return true
    },
    async session({ session, token }) {
      if (session.user && session.user.email) {
        const userRes = await getUserByEmail(session.user.email)
        session.user.name = userRes.name
        session.role = userRes.role
      }

      return session
    },
  },
  adapter: DynamoDBAdapter(client),

  // pages: {
  //   signIn: '/auth/signin',
  // },
})
