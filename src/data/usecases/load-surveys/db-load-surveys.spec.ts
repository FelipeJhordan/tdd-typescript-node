import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'
import { DbLoadSurveys } from './db-load-surveys'

const makeFakeSurveys = () : SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      }],
      date: new Date()
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [{
        image: 'other_image',
        answer: 'other_answer'
      }],
      date: new Date()
    }
  ]
}

const makeLoadSurveysRepositorySub = ():LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }

  return new LoadSurveysRepositoryStub()
}

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    const loadSurveysRepository = makeLoadSurveysRepositorySub()
    const loadAllSpy = jest.spyOn(loadSurveysRepository, 'loadAll')
    const sut = new DbLoadSurveys(loadSurveysRepository)
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
