import { Validation } from '@/presentation/protocols/validation'
import { EmailValidator } from '@/validations/protocols/email-validator'
import { CompareFieldsValidation } from '@/validations/validator/compare-field-validation'
import { EmailValidation } from '@/validations/validator/email-validation'
import { RequiredFieldValidation } from '@/validations/validator/required-field-validation'
import { ValidationComposite } from '@/validations/validator/validation-composite'
import { makeSignupValidation } from './signup-validation-factory'

jest.mock('../../../../validations/validator/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('Signup Validation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeSignupValidation()
    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
