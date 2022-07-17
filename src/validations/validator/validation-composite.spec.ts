import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  test('Should return a error if any validations fails', async () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return null
      }
    }
    const validatioStub = new ValidationStub()
    const sut = new ValidationComposite([validatioStub])
    jest.spyOn(validatioStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
