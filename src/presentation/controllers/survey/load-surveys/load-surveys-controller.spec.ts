import { HttpRequest, LoadSurveys } from './load-surveys-controller-protocols'
import mockDate from 'mockdate'
import { LoadSurveysController } from './load-surveys-controller'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { mockSurveyModels, throwError } from '@/domain/test'
import { mockLoadSurveys } from '@/presentation/test'

interface SutTypes {
  sut: LoadSurveysController,
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)

  return {
    sut,
    loadSurveysStub
  }
}

const mockRequest = ():HttpRequest => ({
  accountId: 'survey_id'

})

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    mockDate.set(new Date())
  })

  afterAll(() => {
    mockDate.reset()
  })
  test('Should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const httpRequest = mockRequest()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle(httpRequest)

    expect(loadSpy).toBeCalledWith(httpRequest.accountId)
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyModels()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => resolve([])))
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
