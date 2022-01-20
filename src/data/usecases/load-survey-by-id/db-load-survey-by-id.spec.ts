import Mockdate from 'mockdate'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import { LoadSurveyByIdRepository, SurveyModel } from './db-load-survey-by-id-protocols'

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  date: new Date(),
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ]
})

const makeLoadSurveyByIdRepositoryStub = () => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (): Promise<SurveyModel> {
      return makeFakeSurvey()
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

const makeSut = () => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepositoryStub()

  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)

  return {
    sut,
    loadSurveyByIdRepositoryStub
  }
}

describe('DbLoadSurveyById UseCase', () => {
  beforeAll(() => {
    Mockdate.set(new Date())
  })

  afterAll(() => {
    Mockdate.reset()
  })

  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()

    const loadIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')

    await sut.loadById('any_id')

    expect(loadIdSpy).toHaveBeenCalledWith('any_id')
  })
  test('Should return Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadById('any_id')
    expect(surveys).toEqual(makeFakeSurvey())
  })
  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
