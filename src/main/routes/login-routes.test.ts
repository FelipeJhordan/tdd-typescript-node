import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import { hash } from 'bcrypt'

let accountCollection: Collection
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getColletion('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
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
  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('samsung', 12)
      await accountCollection.insertOne({
        name: 'Felipe',
        email: 'felipejhordan.alves@gmail.com',
        password
      })
      await request(app)
        .post('/api/v1/login')
        .send({
          email: 'felipejhordan.alves@gmail.com',
          password: 'samsung'
        })
        .expect(200)
    })
  })
})
