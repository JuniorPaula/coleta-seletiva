import { LoadLocationById } from '@/domain/usecases/locations/load-location-by-id'
import { Controller, HttpRequest, HttpResponse } from '../item/item-protocols'

export class LoadLocationByIdController implements Controller {
  constructor (private readonly loadLocationById: LoadLocationById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadLocationById.loadById(httpRequest.params.locatonId)
    return {
      statusCode: 200,
      body: 'ok'
    }
  }
}
