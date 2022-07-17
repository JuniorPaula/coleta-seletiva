import { Validation } from '@/presentation/protocols/validation'
import { HttpRequest } from '../item/item-protocols'
import { LocationController } from './location-controller'

const mockFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    latitude: 12345,
    longitude: 54321,
    city: 'any_city',
    uf: 'any_uf',
    items: [
      'any_item_id_1',
      'any_item_id_2'
    ]
  }
})

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTipes = {
  sut: LocationController
  validationStub: Validation
}

const makeSut = (): SutTipes => {
  const validationStub = mockValidation()
  const sut = new LocationController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('Location Controller', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
