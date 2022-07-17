import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation } from '@/validations/validator/required-field-validation'
import { ValidationComposite } from '@/validations/validator/validation-composite'
import { makeItemValidation } from './item-validation-factory'

jest.mock('../../../validations/validator/validation-composite')

describe('Items Validation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeItemValidation()
    const validations: Validation[] = []

    for (const field of ['title', 'image']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
