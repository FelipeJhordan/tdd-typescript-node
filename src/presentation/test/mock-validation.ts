import { Validation } from '../protocols'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (inpout: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}
