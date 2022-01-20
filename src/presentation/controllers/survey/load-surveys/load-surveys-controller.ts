import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpResponse, Controller, HttpRequest, LoadSurveys } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private loadSurveys : LoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? ok(surveys) : noContent()
    } catch (e) {
      return serverError(e)
    }
  }
}
