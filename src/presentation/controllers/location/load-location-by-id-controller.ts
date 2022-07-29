import { LoadLocationById } from '@/domain/usecases/locations/load-location-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { forbiden } from '@/presentation/helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../item/item-protocols'

export class LoadLocationByIdController implements Controller {
  constructor (private readonly loadLocationById: LoadLocationById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { locationId } = httpRequest.params
    const location = await this.loadLocationById.loadById(locationId)
    if (!location) {
      return forbiden(new InvalidParamError('locationId'))
    }
    return {
      statusCode: 200,
      body: 'ok'
    }
  }
}
