import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../utils/db'

const getUserByEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const body = req.body

    const params = {
      ExpressionAttributeValues: {
        ':email': body.email,
      },
      KeyConditionExpression: 'email = :email',
      IndexName: 'email-index',
      TableName: 'users',
    }

    try {
      const data = await db.query(params).promise()

      res.statusCode = 200
      if (data.Items && data.Items?.length > 0) {
        res.json(data.Items[0])
      } else {
        res.json({ error: 'User not found' })
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export default getUserByEmail
