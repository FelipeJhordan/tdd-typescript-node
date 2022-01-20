import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_name',
      fieldToCompare: 'any_value'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
  test('Should not return if validation succeds', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'valuematch',
      fieldToCompare: 'valuematch'
    })
    expect(error).toBeFalsy()
  })
})
