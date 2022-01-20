import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class CompareFieldsValidation implements Validation {
  constructor (private fieldName: string, private fieldToCompareName: string) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
