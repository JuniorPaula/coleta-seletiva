import { LocationModel } from '@/domain/model/location-model'
import { LoadLocationById } from '@/domain/usecases/locations/load-location-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { forbiden } from '@/presentation/helpers/http-helpers'
import { HttpRequest } from '@/presentation/protocols'
import { LoadLocationByIdController } from './load-location-by-id-controller'

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

const mockRequest = (): HttpRequest => ({
  params: {
    locationId: 'location_id'
  }
})

const mockLoadLocationById = (): LoadLocationById => {
  class LoadLocationByIdStub implements LoadLocationById {
    async loadById (id: string): Promise<LocationModel> {
      return await Promise.resolve(mockLocationModel())
    }
  }
  return new LoadLocationByIdStub()
}

type SutTypes = {
  sut: LoadLocationByIdController
  loadLocationByIdStub: LoadLocationById
}

const makeSut = (): SutTypes => {
  const loadLocationByIdStub = mockLoadLocationById()
  const sut = new LoadLocationByIdController(loadLocationByIdStub)

  return {
    sut,
    loadLocationByIdStub
  }
}

describe('LoadLocationById Controller', () => {
  test('Should call LoadLocationById with correct id', async () => {
    const { sut, loadLocationByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadLocationByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('location_id')
  })

  test('Should return 403 if LoadLocationById null', async () => {
    const { sut, loadLocationByIdStub } = makeSut()
    jest.spyOn(loadLocationByIdStub, 'loadById').mockReturnValueOnce(
      Promise.resolve(null)
    )
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbiden(new InvalidParamError('locationId')))
  })
})
