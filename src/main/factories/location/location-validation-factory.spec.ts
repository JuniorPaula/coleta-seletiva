import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation } from '@/validations/validator/required-field-validation'
import { ValidationComposite } from '@/validations/validator/validation-composite'
import { makeLocationValidation } from './location-validation-factory'

jest.mock('../../../validations/validator/validation-composite')

describe('Items Validation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeLocationValidation()
    const validations: Validation[] = []

    for (const field of ['name', 'email', 'latitude', 'longitude', 'city', 'uf', 'items']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
