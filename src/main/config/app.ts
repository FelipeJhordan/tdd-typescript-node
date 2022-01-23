import express from 'express'
import setupMidlewares from './middlewares'
import setupRoutes from './routes'
import setupStaticFiles from './static-files'
import setupSwagger from './config-swagger'

const app = express()

setupSwagger(app)
setupMidlewares(app)
setupRoutes(app)
setupStaticFiles(app)

export default app
