import { SaveSurveyResultRepository } from '@/data/protocols/db/surver-result/save-survey-result-repository'
import { mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResultRepository } from '../protocols/db/surver-result/load-survey-result-repository'
import { SaveSurveyResultParams, SurveyResultModel } from '../usecases/survey-result/save-survey-result/db-save-survey-results-protocols'

export const mockSaveSurveyResultRepository = () => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return mockSurveyResultModel()
    }
  }

  return new SaveSurveyResultRepositoryStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string) : Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }

  return new LoadSurveyResultRepositoryStub()
}
