import { LocationItemRepository } from '@/data/protocols/location-item/location-item-repository'
import { AddLocationRepository } from '@/data/protocols/locations/add-location-repository'
import { LocationItemModel } from '@/domain/model/location-item-model'
import { LocationItem } from '@/domain/usecases/location-item/create-location-item'
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
    { id: 'any_item_id_1' },
    { id: 'any_item_id_2' }
  ]
})

const mockLocationItem = (): LocationItemModel[] => {
  return [
    {
      location_id: 'any_location_id',
      item_id: 'any_item_id_1'
    },
    {
      location_id: 'any_location_id',
      item_id: 'any_item_id_2'
    }
  ]
}

const mockAddLocationRepository = (): AddLocationRepository => {
  class AddLocationRepositoryStub implements AddLocationRepository {
    async add (location: AddLocationModel): Promise<string> {
      return await new Promise(resolve => resolve('any_location_id'))
    }
  }
  return new AddLocationRepositoryStub()
}

const mockLocationItemRepository = (): LocationItemRepository => {
  class LocationItemRepositoryStub implements LocationItemRepository {
    async create (data: LocationItemModel[]): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new LocationItemRepositoryStub()
}

type SutTypes = {
  sut: DbAddLocation
  addLocationRepository: AddLocation
  locationItemRepository: LocationItem
}

const makeSut = (): SutTypes => {
  const addLocationRepository = mockAddLocationRepository()
  const locationItemRepository = mockLocationItemRepository()
  const sut = new DbAddLocation(addLocationRepository, locationItemRepository)

  return {
    sut,
    addLocationRepository,
    locationItemRepository
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

  test('Should call LocationItemRepository with correct values', async () => {
    const { sut, locationItemRepository } = makeSut()
    const locationItemSpy = jest.spyOn(locationItemRepository, 'create')
    await sut.add(mockLocation())
    expect(locationItemSpy).toHaveBeenCalledWith(mockLocationItem())
  })

  test('Should throw if LocationItemRepository throws', async () => {
    const { sut, locationItemRepository } = makeSut()
    jest.spyOn(locationItemRepository, 'create').mockReturnValueOnce(
      new Promise((_, reject) => reject(new Error()))
    )
    const promise = sut.add(mockLocation())
    await expect(promise).rejects.toThrow()
  })
})
