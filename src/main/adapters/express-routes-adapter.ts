import { Request, Response } from 'express'
import { Controller, HttpRequest } from '@/presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      query: request.query,
      params: request.params
    }
    const httpResponse = await controller.handle(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
