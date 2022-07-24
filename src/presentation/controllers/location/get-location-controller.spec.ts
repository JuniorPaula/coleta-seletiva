import { LocationModel } from '@/domain/model/location-model'
import { DataLocation, GetLocations } from '@/domain/usecases/locations/get-locations'
import { NotFoundError, ServerError } from '@/presentation/errors'
import { HttpRequest } from '../item/item-protocols'
import { GetLocationController } from './get-location-controller'

const mockHttpRequest = (): HttpRequest => ({
  query: 'any_query'
})

const mockLocationModel = (): LocationModel[] => {
  return [
    {
      location: {
        id: 'any_id',
        image: 'any_url_image',
        name: 'any_name',
        email: 'any_email',
        latitude: 1234,
        longitude: 5678,
        city: 'any_city',
        uf: 'any_uf'
      },
      items: [
        { title: 'any_title' },
        { title: 'other_title' }
      ]
    }
  ]
}

const mockGetLocation = (): GetLocations => {
  class GetLocationStub implements GetLocations {
    async get (query: DataLocation): Promise<LocationModel[]> {
      return await Promise.resolve(mockLocationModel())
    }
  }
  return new GetLocationStub()
}

type Suttypes = {
  sut: GetLocationController
  getLocationStub: GetLocations
}

const makeSut = (): Suttypes => {
  const getLocationStub = mockGetLocation()
  const sut = new GetLocationController(getLocationStub)

  return {
    sut,
    getLocationStub
  }
}

describe('GetLocation Controller', () => {
  test('Should call GetLocation with correct value', async () => {
    const { sut, getLocationStub } = makeSut()
    const getSpy = jest.spyOn(getLocationStub, 'get')
    const httpRequest = mockHttpRequest()
    await sut.handle(httpRequest)
    expect(getSpy).toHaveBeenCalledWith('any_query')
  })

  test('Should return 404 if GetLocation retuns an empty list', async () => {
    const { sut, getLocationStub } = makeSut()
    jest.spyOn(getLocationStub, 'get').mockResolvedValueOnce(new Promise(resolve => resolve([])))
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toEqual(new NotFoundError())
  })

  test('Should return 500 if GetLocation throws', async () => {
    const { sut, getLocationStub } = makeSut()
    jest.spyOn(getLocationStub, 'get').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return a locations with on success', async () => {
    const { sut } = makeSut()
    const httpRequest = mockHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(mockLocationModel())
  })
})
