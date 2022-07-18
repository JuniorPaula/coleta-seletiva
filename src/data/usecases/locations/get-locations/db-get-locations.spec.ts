import { GetLocationsRepository } from '@/data/protocols/locations/get-locations-repository'
import { LocationModel } from '@/domain/model/location-model'
import { DataLocation } from '@/domain/usecases/locations/get-locations'
import { DbGetLocations } from './db-get-locations'

const mockQuery = (): DataLocation => ({
  city: 'any_city',
  uf: 'any_uf',
  items: [
    'any_item_id'
  ]
})

describe('Db GetLocations usecase', () => {
  test('Should calls GetLocationsRepository with correct values', async () => {
    class GetLocationsRepositoryStub implements GetLocationsRepository {
      async get (query: DataLocation): Promise<LocationModel> {
        return await Promise.resolve({
          id: 'any_id',
          image: 'any_url_image',
          name: 'any_name',
          email: 'any_email',
          latitude: 1234,
          longitude: 5678,
          city: 'any_city',
          uf: 'any_uf',
          items: [
            'any_item_id'
          ]
        })
      }
    }

    const getLocationsStub = new GetLocationsRepositoryStub()
    const sut = new DbGetLocations(getLocationsStub)
    const getSpy = jest.spyOn(getLocationsStub, 'get')
    await sut.get(mockQuery())
    expect(getSpy).toHaveBeenCalledWith(mockQuery())
  })
})
