
import {
  RequiredFieldValidation,
  CompareFieldsValidation,
  EmailValidation,
  ValidationComposite
} from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(
      new RequiredFieldValidation(field)
    )
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}