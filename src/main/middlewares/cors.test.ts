import request from 'supertest'
import { app } from '../config/app'

describe('CORS Middleware', () => {
  test('Should cors enabled', async () => {
    app.post('/test-cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test-cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
