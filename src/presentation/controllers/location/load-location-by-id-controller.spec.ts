import { LocationModel } from '@/domain/model/location-model'
import { LoadLocationById } from '@/domain/usecases/locations/load-location-by-id'
import { HttpRequest } from '@/presentation/protocols'
import { LoadLocationByIdController } from './load-location-by-id-controller'

describe('LoadLocationById Controller', () => {
  test('Should call LoadLocationById with correct id', async () => {
    class LoadLocationByIdStub implements LoadLocationById {
      async loadById (id: string): Promise<LocationModel> {
        return await Promise.resolve({
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
      }
    }
    const loadLocationByIdStub = new LoadLocationByIdStub()
    const sut = new LoadLocationByIdController(loadLocationByIdStub)
    const loadByIdSpy = jest.spyOn(loadLocationByIdStub, 'loadById')
    const httpRequest: HttpRequest = {
      params: {
        locatonId: 'location_id'
      }
    }
    await sut.handle(httpRequest)
    expect(loadByIdSpy).toHaveBeenCalledWith('location_id')
  })
})
