import { LocationModel } from '@/domain/model/location-model'
import { DataLocation, GetLocations } from '@/domain/usecases/locations/get-locations'
import { HttpRequest } from '../item/item-protocols'
import { GetLocationController } from './get-location-controller'

const mockHttpRequest = (): HttpRequest => ({
  query: 'any_query'
})

describe('GetLocation Controller', () => {
  test('Should call GetLocation with correct value', async () => {
    class GetLocationStub implements GetLocations {
      async get (query: DataLocation): Promise<LocationModel> {
        const locations: LocationModel = {
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
        return await Promise.resolve(locations)
      }
    }
    const getLocationStub = new GetLocationStub()
    const sut = new GetLocationController(getLocationStub)
    const getSpy = jest.spyOn(getLocationStub, 'get')
    const httpRequest = mockHttpRequest()
    await sut.handle(httpRequest)
    expect(getSpy).toHaveBeenCalledWith('any_query')
  })
})
