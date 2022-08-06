import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from './compare-field-validation'

describe('CompareFields Validation', () => {
  test('Should returns a InvalidParamsError if validation fails', async () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare')
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'wrong_value'
    })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
})
