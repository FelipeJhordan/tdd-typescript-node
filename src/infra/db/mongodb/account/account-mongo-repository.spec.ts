import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

let accountColletion : Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountColletion = await MongoHelper.getColletion('accounts')
    await accountColletion.deleteMany({})
  })

  const makeSut = () : AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password'
      })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@gmail.com')
      expect(account.password).toBe('any_password')
    })
  })
  describe('loadByEmail', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      await accountColletion.insertOne({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password'
      })

      const account = await sut.loadByEmail(
        'any_email@gmail.com'
      )

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@gmail.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()

      const account = await sut.loadByEmail(
        'any_email@gmail.com'
      )

      expect(account).toBeFalsy()
    })
  })

  describe('update', () => {
    test('Should update the account acessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const res = await accountColletion.insertOne({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password'
      })

      const accountBeforeAccessGenerated = await accountColletion.findOne({ _id: res.insertedId })

      expect(accountBeforeAccessGenerated.accessToken).toBeFalsy()

      await sut.updateAccessToken(res.insertedId.toString(), 'any_token')

      const account = await accountColletion.findOne({ _id: res.insertedId })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })
  describe('loadByToken()', () => {
    test('Should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      await accountColletion.insertOne({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })

      const account = await sut.loadByToken('any_token')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@gmail.com')
      expect(account.password).toBe('any_password')
    })
    test('Should return an account on loadByToken with admin  role', async () => {
      const sut = makeSut()
      await accountColletion.insertOne({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })

      const account = await sut.loadByToken('any_token', 'admin')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@gmail.com')
      expect(account.password).toBe('any_password')
    })
    test('Should return null on loadByToken with invalid  role', async () => {
      const sut = makeSut()
      await accountColletion.insertOne({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })

      const account = await sut.loadByToken('any_token', 'admin')

      expect(account).toBeFalsy()
    })

    test('Should return an account on loadByToken with if user is admin', async () => {
      const sut = makeSut()
      await accountColletion.insertOne({
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })

      const account = await sut.loadByToken('any_token')

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@gmail.com')
      expect(account.password).toBe('any_password')
    })
    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeFalsy()
    })
  })
})
