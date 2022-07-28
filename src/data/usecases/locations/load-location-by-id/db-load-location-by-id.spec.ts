import { LoadLocationByIdRepository } from '@/data/protocols/locations/load-location-by-id-repository'
import { LocationModel } from '@/domain/model/location-model'
import { LoadLocationById } from '@/domain/usecases/locations/load-location-by-id'
import { DbLoadLocationById } from './db-load-location-by-id'

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

const mockLoadLocationByIdRepository = (): LoadLocationByIdRepository => {
  class LoadLocationByIdRepositoryStub implements LoadLocationByIdRepository {
    async loadById (id: string): Promise<LocationModel> {
      return await Promise.resolve(mockLocationModel())
    }
  }

  return new LoadLocationByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadLocationById
  loadLocationByIdRepositoryStub: LoadLocationById
}

const makeSut = (): SutTypes => {
  const loadLocationByIdRepositoryStub = mockLoadLocationByIdRepository()
  const sut = new DbLoadLocationById(loadLocationByIdRepositoryStub)

  return {
    sut,
    loadLocationByIdRepositoryStub
  }
}

describe('DB LoadLocationById usecase', () => {
  test('Should call LoadLocationByIdRepository with correct id', async () => {
    const { sut, loadLocationByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadLocationByIdRepositoryStub, 'loadById')
    await sut.loadById('location_id')
    expect(loadSpy).toHaveBeenCalledWith('location_id')
  })

  test('Should throw if LoadLocationByIdRepository throws', async () => {
    const { sut, loadLocationByIdRepositoryStub } = makeSut()

    jest.spyOn(loadLocationByIdRepositoryStub, 'loadById').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.loadById('location_id')
    await expect(promise).rejects.toThrow()
  })
})
