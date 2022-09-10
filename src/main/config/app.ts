import express from 'express'
import setupMiddleware from './middlewares'
import setupRoutes from './routes'
import setuptSwagger from './swagger-config'
import setupStaticFile from './static-files'

const app = express()
setupStaticFile(app)
setuptSwagger(app)
setupMiddleware(app)
setupRoutes(app)

export default app
