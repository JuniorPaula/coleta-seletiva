import 'module-alias/register'
import 'dotenv/config'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import env from '@/main/config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    console.info('[+] Mongodb is connected')
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.info(`[+] Server is running at ${env.port}`))
  })
  .catch(console.error)
