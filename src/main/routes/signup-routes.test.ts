import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountColletion = MongoHelper.getColletion('accounts')
    accountColletion.deleteMany({})
  })
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/v1/signup')
      .send({
        name: 'Felipe',
        email: 'felipejhordan.alves@gmail.com',
        password: 'samsung',
        passwordConfirmation: 'samsung'
      })
      .expect(200)
  })
})
