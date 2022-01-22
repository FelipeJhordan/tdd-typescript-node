import { LoadSurveyResultRepository } from '../../load-survey-result/db-load-survey-result-protocols'
import { SaveSurveyResult, SaveSurveyResultParams, SaveSurveyResultRepository, SurveyResultModel } from './db-save-survey-results-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private saveSurveyResultRepository : SaveSurveyResultRepository,
    private loadSurveyResultRepository: LoadSurveyResultRepository
  ) {

  }

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId)
    return surveyResult
  }
}
