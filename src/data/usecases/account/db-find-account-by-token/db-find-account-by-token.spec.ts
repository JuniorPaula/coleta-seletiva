import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { DbFindAccountByToken } from './db-find-account-by-token'

describe('DbFindAccountByToken usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (value: string): Promise<string> {
        return await Promise.resolve('token_decrypted')
      }
    }

    const decrypterStub = new DecrypterStub()
    const sut = new DbFindAccountByToken(decrypterStub)
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.findByToken('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
