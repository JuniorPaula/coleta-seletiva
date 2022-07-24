import { GetLocations } from '@/domain/usecases/locations/get-locations'
import { notFoundError, ok, serverError } from '@/presentation/helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../item/item-protocols'

export class GetLocationController implements Controller {
  constructor (private readonly getLocation: GetLocations) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (httpRequest.query) {
        const locations = await this.getLocation.get(httpRequest.query)
        if (!locations.length) return notFoundError()

        return ok(locations)
      }
      const locations = await this.getLocation.get()
      if (!locations.length) return notFoundError()

      return ok(locations)
    } catch (error) {
      return serverError()
    }
  }
}
