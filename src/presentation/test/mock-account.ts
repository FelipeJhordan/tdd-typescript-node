import { mockAccountModel } from '@/domain/test'
import { AddAccount, AddAccountParams } from '../controllers/login/signup/signup-controller-protocols'
import { AccountModel } from '@/domain/models/account'
import { Authentication, AuthenticationParams } from '../controllers/login/login/login-controller-protocols'
import { LoadAccountByToken } from '../middlewares/auth-middleware-protocols'
import { AuthenticationModel } from '@/domain/models/authentication'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
      return new Promise(resolve => resolve({
        accessToken: 'any_token',
        name: mockAccountModel().name
      }))
    }
  }

  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new LoadAccountByTokenStub()
}
