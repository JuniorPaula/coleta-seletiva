import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation } from '@/validations/validator/required-field-validation'
import { ValidationComposite } from '@/validations/validator/validation-composite'
import { makeSignupValidation } from './signup-validation-factory'

jest.mock('../../../../validations/validator/validation-composite')

describe('Signup Validation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeSignupValidation()
    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
