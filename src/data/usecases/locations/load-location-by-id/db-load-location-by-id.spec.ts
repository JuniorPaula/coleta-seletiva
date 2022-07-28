import { LoadLocationByIdRepository } from '@/data/protocols/locations/load-location-by-id-repository'
import { LocationModel } from '@/domain/model/location-model'
import { DbLoadLocationById } from './db-load-location-by-id'

describe('DB LoadLocationById usecase', () => {
  test('Should call LoadLocationByIdRepository with correct id', async () => {
    class LoadLocationByIdRepositoryStub implements LoadLocationByIdRepository {
      async loadById (id: string): Promise<LocationModel> {
        return await Promise.resolve(
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
        )
      }
    }
    const loadLocationByIdRepositoryStub = new LoadLocationByIdRepositoryStub()
    const sut = new DbLoadLocationById(loadLocationByIdRepositoryStub)
    const loadSpy = jest.spyOn(loadLocationByIdRepositoryStub, 'loadById')
    await sut.loadById('location_id')
    expect(loadSpy).toHaveBeenCalledWith('location_id')
  })
})
