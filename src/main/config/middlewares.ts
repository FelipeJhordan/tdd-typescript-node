import { Express } from 'express'
import { contentType, bodyParser, cors } from '../middlewares'

export default (app: Express):void => {
  app.use(contentType)
  app.use(bodyParser)
  app.use(cors)
}
