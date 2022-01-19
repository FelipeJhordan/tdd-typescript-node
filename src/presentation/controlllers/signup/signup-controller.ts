
import { Controller, HttpRequest, HttpResponse, AddAccount, Validation, Authentication } from './signup-controller-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'

export class SignUpController implements Controller {
  constructor (
    private addAccount: AddAccount,
    private validation: Validation,
    private authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      await this.addAccount.add({
        name,
        email,
        password
      })
      const accessToken = await this.authentication.auth(
        {
          email,
          password
        }
      )
      return ok({ accessToken })
    } catch (e) {
      return serverError(e)
    }
  }
}
