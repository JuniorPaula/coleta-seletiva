import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await Promise.resolve('access_token')
  }
}))

describe('JwtAdapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const sut = new JwtAdapter('secret')
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.generate('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    test('Should return a token on sign succeeds', async () => {
      const sut = new JwtAdapter('secret')
      const accessToken = await sut.generate('any_id')
      expect(accessToken).toBe('access_token')
    })

    test('Should throw if sign throws', async () => {
      const sut = new JwtAdapter('secret')
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.generate('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
})
