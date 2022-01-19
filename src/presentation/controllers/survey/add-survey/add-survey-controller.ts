import { AddSurvey } from './../../../../domain/usecases/add-survey'
import { badRequest, noContent } from './../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-survey-controller-protocols'
import { serverError } from '../../../helpers/http/http-helper'
export class AddSurveyController implements Controller {
  constructor (
    private validation: Validation,
    private addSurvey: AddSurvey
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { question, answers } = httpRequest.body
      await this.addSurvey.add({
        question,
        answers
      })

      return noContent()
    } catch (e) {
      return serverError(e)
    }
  }
}