import { NotFoundError, ServerError, UnauthorizedError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/protocols/http'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbiden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const notFoundError = (): HttpResponse => ({
  statusCode: 404,
  body: new NotFoundError()
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
