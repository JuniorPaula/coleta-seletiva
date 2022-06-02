import { GetItemsController } from './get-item-controller'

describe('Get Items Controllers', () => {
  test('Should return an items on success', async () => {
    const sut = new GetItemsController()
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual([])
  })
})
