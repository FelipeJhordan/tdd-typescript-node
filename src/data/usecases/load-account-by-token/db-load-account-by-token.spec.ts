import { DbLoadAccountByToken } from './db-load-account-by-token'
import {
  Decrypter
} from '../../protocols/criptography/decrypter'

interface SutTypes {
    sut: DbLoadAccountByToken,
    decrypterStub: Decrypter
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string) : Promise<string> {
      return new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const descryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')

    expect(descryptSpy).toHaveBeenCalledWith('any_token')
  })
})
