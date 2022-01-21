import { DbSaveSurveyResult } from './db-save-survey-result'
import { SaveSurveyResultModel, SaveSurveyResultRepository, SurveyResultModel } from './db-save-survey-results-protocols'
import mockDate from 'mockdate'

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  answer: 'any_answer',
  surveyId: 'any_survey_id',
  accountId: 'any_account)id',
  date: new Date()
})

const makeFakeSurveyResult = (): SurveyResultModel => ({
  id: 'any_id',
  ...makeFakeSurveyResultData()
})

const makeSaveSurveyResultRepositoryStub = () => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return makeFakeSurveyResult()
    }
  }

  return new SaveSurveyResultRepositoryStub()
}

const makeSut = () => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepositoryStub()

  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)

  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult UseCase', () => {
  beforeAll(() => {
    mockDate.set(new Date())
  })

  afterAll(() => {
    mockDate.reset()
  })
  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')

    const surveyData = makeFakeSurveyResultData()

    await sut.save(surveyData)

    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should thorw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.save(makeFakeSurveyResultData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const survey = await sut.save(makeFakeSurveyResultData())

    expect(survey).toEqual(makeFakeSurveyResult())
  })
})
