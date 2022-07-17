import { AddLocation } from '@/domain/usecases/locations/add-location'
import { badRequest } from '@/presentation/helpers/http-helpers'
import { Validation } from '@/presentation/protocols/validation'
import { Controller, HttpRequest, HttpResponse } from '../item/item-protocols'

export class LocationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addLocation: AddLocation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { name, email, latitude, longitude, city, uf, items } = httpRequest.body
    await this.addLocation.add({
      name,
      email,
      latitude,
      longitude,
      city,
      uf,
      items
    })

    return {
      statusCode: 200,
      body: null
    }
  }
}
