import { Router } from 'express'

export default (router: Router): void => {
  router.post('/item', (req, res) => {
    res.json({ ok: 'fine' })
  })
}
