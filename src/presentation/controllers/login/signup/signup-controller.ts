import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { forbidden, badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'

import { Controller, HttpRequest, HttpResponse, AddAccount, Validation, Authentication } from './signup-controller-protocols'

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

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

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
