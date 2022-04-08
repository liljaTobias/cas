import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../utils/db'

const func = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id

  if (req.method === 'GET') {
    const params = {
      TableName: 'Organizations',
      Key: {
        organization_id: id,
      },
    }

    try {
      const org = await db.get(params).promise()
      res.statusCode = 200
      res.json(org.Item)
    } catch (err) {
      console.log(err)
    }
  }
}

export default func
