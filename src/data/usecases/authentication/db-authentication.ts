import {
  Encrypter,
  AuthenticationModel,
  HashComparer,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  Authentication
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
    private updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
