import AWS from 'aws-sdk'

AWS.config.update({
  region: process.env.AWS_SERVICE_REGION,
  credentials: {
    accessKeyId: process.env.AWS_SERVICE_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SERVICE_SECRET_KEY as string,
  },
})

const db = new AWS.DynamoDB.DocumentClient({ apiVersion: 'latest' })

export default db
