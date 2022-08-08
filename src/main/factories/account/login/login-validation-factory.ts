import { Validation } from '@/presentation/protocols/validation'
import { EmailValidation } from '@/validations/validator/email-validation'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { RequiredFieldValidation } from '@/validations/validator/required-field-validation'
import { ValidationComposite } from '@/validations/validator/validation-composite'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
