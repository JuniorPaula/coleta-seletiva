import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { DbFindAccountByToken } from './db-find-account-by-token'

const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await Promise.resolve('token_decrypted')
    }
  }
  return new DecrypterStub()
}

type SutTypes = {
  sut: DbFindAccountByToken
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter()
  const sut = new DbFindAccountByToken(decrypterStub)

  return {
    sut,
    decrypterStub
  }
}

describe('DbFindAccountByToken usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.findByToken('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should returns null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(
      Promise.resolve(null)
    )
    const account = await sut.findByToken('any_token', 'any_role')
    expect(account).toBeNull()
  })
})
