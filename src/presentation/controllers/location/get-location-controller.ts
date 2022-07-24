import { GetLocations } from '@/domain/usecases/locations/get-locations'
import { Controller, HttpRequest, HttpResponse } from '../item/item-protocols'

export class GetLocationController implements Controller {
  constructor (private readonly getLocation: GetLocations) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.getLocation.get(httpRequest.query)
    return await new Promise(resolve => resolve(null))
  }
}
