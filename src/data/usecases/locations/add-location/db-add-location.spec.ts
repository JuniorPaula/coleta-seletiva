import { LocationModel } from '@/domain/model/location-model'
import { AddLocation, AddLocationModel } from '@/domain/usecases/locations/add-location'
import { DbAddLocation } from './db-add-location'

const mockLocation = (): AddLocationModel => ({
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

describe('Db AddLocation usecase', () => {
  test('Should call AddLocationRepository with correct values', async () => {
    class AddLocationRepositoryStub implements AddLocation {
      async add (location: LocationModel): Promise<string> {
        return await new Promise(resolve => resolve('any_id'))
      }
    }
    const addLocationRepository = new AddLocationRepositoryStub()
    const sut = new DbAddLocation(addLocationRepository)
    const locationSpy = jest.spyOn(addLocationRepository, 'add')
    await sut.add(mockLocation())
    expect(locationSpy).toHaveBeenCalledWith(mockLocation())
  })
})
