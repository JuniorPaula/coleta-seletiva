import { AddLocationRepository } from '@/data/protocols/locations/add-location-repository'
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

const mockAddLocationRepository = (): AddLocationRepository => {
  class AddLocationRepositoryStub implements AddLocationRepository {
    async add (location: LocationModel): Promise<string> {
      return await new Promise(resolve => resolve('any_id'))
    }
  }
  return new AddLocationRepositoryStub()
}

type SutTypes = {
  sut: DbAddLocation
  addLocationRepository: AddLocation
}

const makeSut = (): SutTypes => {
  const addLocationRepository = mockAddLocationRepository()
  const sut = new DbAddLocation(addLocationRepository)

  return {
    sut,
    addLocationRepository
  }
}

describe('Db AddLocation usecase', () => {
  test('Should call AddLocationRepository with correct values', async () => {
    const { sut, addLocationRepository } = makeSut()
    const locationSpy = jest.spyOn(addLocationRepository, 'add')
    await sut.add(mockLocation())
    expect(locationSpy).toHaveBeenCalledWith(mockLocation())
  })

  test('Should throw if AddLocationRepository throws', async () => {
    const { sut, addLocationRepository } = makeSut()
    jest.spyOn(addLocationRepository, 'add').mockReturnValueOnce(
      new Promise((_, reject) => reject(new Error()))
    )
    const promise = sut.add(mockLocation())
    await expect(promise).rejects.toThrow()
  })

  test('Should save a location on success', async () => {
    const { sut } = makeSut()
    const locationId = await sut.add(mockLocation())
    expect(locationId).toBeTruthy()
  })
})
