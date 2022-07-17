import { AddLocation, AddLocationModel } from '@/domain/usecases/locations/add-location'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helpers'
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

const mockAddLocation = (): AddLocation => {
  class AddLocationStub implements AddLocation {
    async add (location: AddLocationModel): Promise<string> {
      return await new Promise(resolve => resolve('any_locationId'))
    }
  }
  return new AddLocationStub()
}

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
  addLocationStub: AddLocation
}

const makeSut = (): SutTipes => {
  const validationStub = mockValidation()
  const addLocationStub = mockAddLocation()
  const sut = new LocationController(validationStub, addLocationStub)
  return {
    sut,
    validationStub,
    addLocationStub
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

  test('Should returns 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpRequest = mockFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call addLocation with correct values', async () => {
    const { sut, addLocationStub } = makeSut()
    const addSpy = jest.spyOn(addLocationStub, 'add')
    const httpRequest = mockFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
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
    })
  })

  test('Should return 500 if addLocation throws', async () => {
    const { sut, addLocationStub } = makeSut()
    jest.spyOn(addLocationStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = mockFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should returns 204 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = mockFakeRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(204)
  })
})
