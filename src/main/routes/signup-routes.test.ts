import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
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
