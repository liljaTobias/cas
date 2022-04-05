import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../utils/db'

const func = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id

  if (req.method === 'GET') {
    const params = {
      TableName: 'users',
      Key: {
        id: id,
        email: 'lilja.tobias94@gmail.com',
      },
    }

    const user = await db.get(params).promise()
    res.statusCode = 200
    res.json(user)
  } else if (req.method === 'POST') {
    const body = req.body

    console.log(body)

    const params = {
      ExpressionAttributeValues: {
        ':email': id,
      },
      TableName: 'users',
    }
  }
}

export default func
