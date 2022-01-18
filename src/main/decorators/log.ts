import { LogErrorRepository } from '../../data/protocols/db/log-error-repository'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
    private readonly controller: Controller
    private readonly logErrorRepository: LogErrorRepository
    constructor (controller: Controller, logErrorRepository: LogErrorRepository) {
      this.controller = controller
      this.logErrorRepository = logErrorRepository
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const SERVER_ERROR = 500
      const httpResponse = await this.controller.handle(httpRequest)
      if (httpResponse.statusCode === SERVER_ERROR) {
        await this.logErrorRepository.logError(httpResponse.body.stack)
      }

      return httpResponse
    }
}
