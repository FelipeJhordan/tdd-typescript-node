import { DbLoadAccountByToken } from './db-load-account-by-token'
import {
  Decrypter
} from '../../protocols/criptography/decrypter'

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (value: string) : Promise<string> {
        return new Promise(resolve => resolve('any_value'))
      }
    }
    const descrypterStub = new DecrypterStub()
    const descryptSpy = jest.spyOn(descrypterStub, 'decrypt')
    const sut = new DbLoadAccountByToken(descrypterStub)
    await sut.load('any_token')

    expect(descryptSpy).toHaveBeenCalledWith('any_token')
  })
})
