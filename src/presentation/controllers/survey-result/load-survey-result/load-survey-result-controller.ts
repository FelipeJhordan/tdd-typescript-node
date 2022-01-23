import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './load-survey-result-controller.protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private loadSurveyById : LoadSurveyById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    return Promise.resolve(null)
  }
}
