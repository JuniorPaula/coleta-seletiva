import request from 'supertest'
import { app } from '../config/app'

describe('Item Routes', () => {
  test('Should return an item on success', async () => {
    await request(app)
      .post('/api/item')
      .send({
        title: 'Olé de cozinha',
        image: 'oleo.png'
      })
      .expect(200)
  })
})
