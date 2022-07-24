import { LocationModel } from '@/domain/model/location-model'
import { DataLocation, GetLocations } from '@/domain/usecases/locations/get-locations'
import { HttpRequest } from '../item/item-protocols'
import { GetLocationController } from './get-location-controller'

const mockHttpRequest = (): HttpRequest => ({
  query: 'any_query'
})

const mockLocationModel = (): LocationModel => ({
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
})

const mockGetLocation = (): GetLocations => {
  class GetLocationStub implements GetLocations {
    async get (query: DataLocation): Promise<LocationModel> {
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
})