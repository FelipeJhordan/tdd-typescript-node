import { SurveyResultModel } from '../models/survey-result'
import { SaveSurveyResultParams } from '../usecases/survey-result/save-survey-result'

export const mockSurveyResultParams = (): SaveSurveyResultParams => ({
  answer: 'any_answer',
  surveyId: 'any_survey_id',
  accountId: 'any_account)id',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  id: 'any_id',
  ...mockSurveyResultParams()
})
