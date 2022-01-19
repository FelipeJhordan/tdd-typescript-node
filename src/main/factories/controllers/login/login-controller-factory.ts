import { makeLogControllerDecorator } from './../decorators/log-controller-decorator-factory'

import { LoginController } from '../../../../presentation/controlllers/login2/login/login-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAuthentication(), makeLoginValidation())

  return makeLogControllerDecorator(loginController)
}
