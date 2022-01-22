import { LoadSurveyResultRepository } from '@/data/protocols/db/surver-result/load-survey-result-repository'
import { mockSurveyResultModel } from '@/domain/test'
import { SurveyResultModel } from '../survey-result/save-survey-result/db-save-survey-results-protocols'
import { DbLoadSurveyResult } from './db-load-survey-result'

describe('DbLoadSurveyResult UseCase', () => {
  test('Should call LoadSurveyResultRepository', async () => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId (surveyId: string) : Promise<SurveyResultModel> {
        return Promise.resolve(mockSurveyResultModel())
      }
    }

    const loadSurveyResultRepositoryStub = new LoadSurveyResultRepositoryStub()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
    const loadSurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')

    expect(loadSurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
