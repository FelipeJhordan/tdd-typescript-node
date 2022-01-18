import env from '../../config/env'
import { JwtAdapter } from './../../../infra/criptography/jwt-adapter/jwt-adapter'
import { BcryptAdapter } from './../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from './../../../infra/db/mongodb/account/account-mongo-repository'
import { DbAuthentication } from './../../../data/usecases/authentication/db-authentication'
import { LogControllerDecorator } from './../../decorators/log-controller-decorator'
import { LoginController } from './../../../presentation/controlllers/login/login-controller'
import { Controller } from '../../../presentation/protocols'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)

  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)

  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(loginController, logMongoRepository)
}
