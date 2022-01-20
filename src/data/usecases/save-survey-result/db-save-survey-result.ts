import { SaveSurveyResult, SaveSurveyResultModel, SaveSurveyResultRepository, SurveyResultModel } from './db-save-survey-results-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private saveSurveyResultRepository : SaveSurveyResultRepository) {

  }

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
