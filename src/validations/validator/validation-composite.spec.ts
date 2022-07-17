import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from './validation-composite'

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: ValidationComposite
  validatioStub: Validation[]
}

const makeSut = (): SutTypes => {
  const validatioStub = [mockValidation(), mockValidation()]
  const sut = new ValidationComposite(validatioStub)

  return {
    sut,
    validatioStub
  }
}

describe('Validation Composite', () => {
  test('Should return a error if any validations fails', async () => {
    const { sut, validatioStub } = makeSut()
    jest.spyOn(validatioStub[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should returns the first error if more than one validation fails', async () => {
    const { sut, validatioStub } = makeSut()
    jest.spyOn(validatioStub[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validatioStub[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  test('Should not returns if validation succeeds', async () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
