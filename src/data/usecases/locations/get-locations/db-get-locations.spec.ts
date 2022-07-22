import { GetLocationsRepository } from '@/data/protocols/locations/get-locations-repository'
import { LocationModel } from '@/domain/model/location-model'
import { DataLocation, GetLocations } from '@/domain/usecases/locations/get-locations'
import { DbGetLocations } from './db-get-locations'

const mockQuery = (): DataLocation => ({
  city: 'any_city',
  uf: 'any_uf'
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

const mockGetLocationsRepository = (): GetLocationsRepository => {
  class GetLocationsRepositoryStub implements GetLocationsRepository {
    async get (query: DataLocation): Promise<LocationModel> {
      return await Promise.resolve(mockLocationModel())
    }
  }
  return new GetLocationsRepositoryStub()
}

type SutTypes = {
  sut: DbGetLocations
  getLocationsStub: GetLocations
}

const makeSut = (): SutTypes => {
  const getLocationsStub = mockGetLocationsRepository()
  const sut = new DbGetLocations(getLocationsStub)

  return {
    sut,
    getLocationsStub
  }
}

describe('Db GetLocations usecase', () => {
  test('Should calls GetLocationsRepository with correct values', async () => {
    const { sut, getLocationsStub } = makeSut()
    const getSpy = jest.spyOn(getLocationsStub, 'get')
    await sut.get(mockQuery())
    expect(getSpy).toHaveBeenCalledWith(mockQuery())
  })

  test('Should throw if GetLocationsRepository throws', async () => {
    const { sut, getLocationsStub } = makeSut()
    jest.spyOn(getLocationsStub, 'get').mockReturnValueOnce(
      new Promise((_, reject) => reject(new Error()))
    )
    const promise = sut.get(mockQuery())
    await expect(promise).rejects.toThrow()
  })

  test('Should returns a locations on success', async () => {
    const { sut } = makeSut()
    const locations = await sut.get(mockQuery())
    expect(locations).toEqual(mockLocationModel())
  })
})
