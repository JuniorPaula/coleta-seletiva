import request from 'supertest'
import { noCache } from './no-cache'
import app from '../config/app'

describe('NoCache Middleware', () => {
  test('Should disabled cache', async () => {
    app.get('/test-cache', noCache, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test-cache')
      .expect('access-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
