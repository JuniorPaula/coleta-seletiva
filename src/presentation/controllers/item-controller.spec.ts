import { ItemController } from './item-controller'

describe('Item Controller', () => {
  test('Should return 400 if no title is provided', async () => {
    const sut = new ItemController()
    const httpRequest = {
      body: {
        image: 'any_image'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
