import { LoadSurveyResultRepository } from '@/data/protocols/db/surver-result/load-survey-result-repository'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { SurveyResultModel } from '../survey-result/save-survey-result/db-save-survey-results-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private loadSurveyResultRepository: LoadSurveyResultRepository) {}
  async load (surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return Promise.resolve(null)
  }
}
