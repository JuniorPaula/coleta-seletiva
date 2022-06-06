import express from 'express'
import setupMiddleware from './middlewares'
import setupRoutes from './routes'
import setupStaticFile from './static-files'

const app = express()
setupStaticFile(app)
setupMiddleware(app)
setupRoutes(app)

export default app
