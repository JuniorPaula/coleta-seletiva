import { MissingParamError } from '../errors/missing-param-error'
import { ItemController } from './item-controller'

const makeSut = (): ItemController => {
  return new ItemController()
}

describe('Item Controller', () => {
  test('Should return 400 if no title is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        image: 'any_image'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('title'))
  })

  test('Should return 400 if no image is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        title: 'any_title'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('image'))
  })
})
