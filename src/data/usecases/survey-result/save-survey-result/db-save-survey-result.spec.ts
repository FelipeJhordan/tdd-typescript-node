import { DbSaveSurveyResult } from './db-save-survey-result'
import { mockSurveyResultModel, mockSurveyResultParams, throwError } from '@/domain/test'

import mockDate from 'mockdate'
import { mockSaveSurveyResultRepository } from '@/data/test/mock-db-survey-result'

const makeSut = () => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()

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

    const surveyData = mockSurveyResultParams()

    await sut.save(surveyData)

    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should thorw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)

    const promise = sut.save(mockSurveyResultModel())
    await expect(promise).rejects.toThrow()
  })

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const survey = await sut.save(mockSurveyResultParams())

    expect(survey).toEqual(mockSurveyResultModel())
  })
})
