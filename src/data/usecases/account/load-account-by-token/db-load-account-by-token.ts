import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
      private decrypter: Decrypter,
      private loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (e) {
      return null
    }
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
