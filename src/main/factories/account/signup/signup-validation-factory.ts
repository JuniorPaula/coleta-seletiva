import { Validation } from '@/presentation/protocols/validation'
import { CompareFieldsValidation } from '@/validations/validator/compare-field-validation'
import { EmailValidation } from '@/validations/validator/email-validation'
import { EmailValidatorAdapter } from '@/validations/validator/email-validator-adapter'
import { RequiredFieldValidation } from '@/validations/validator/required-field-validation'
import { ValidationComposite } from '@/validations/validator/validation-composite'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
