import { FindAccountByTokenRepository } from '@/data/protocols/account/find-account-by-token-repository'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { AccountModel } from '@/domain/model/account'
import { DbFindAccountByToken } from './db-find-account-by-token'

const mockAccountModel = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'encrypted_password'
})

const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await Promise.resolve('token_decrypted')
    }
  }
  return new DecrypterStub()
}

const mockFindAccountByTokenRepository = (): FindAccountByTokenRepository => {
  class FindAccountByTokenRepositoryStub implements FindAccountByTokenRepository {
    async findByToken (token: string, role?: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }

  return new FindAccountByTokenRepositoryStub()
}

type SutTypes = {
  sut: DbFindAccountByToken
  decrypterStub: Decrypter
  findAccountByTokenRepositoryStub: FindAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter()
  const findAccountByTokenRepositoryStub = mockFindAccountByTokenRepository()
  const sut = new DbFindAccountByToken(decrypterStub, findAccountByTokenRepositoryStub)

  return {
    sut,
    decrypterStub,
    findAccountByTokenRepositoryStub
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

  test('Should call FindAccountByTokenRepository with correct values', async () => {
    const { sut, findAccountByTokenRepositoryStub } = makeSut()
    const findByTokenSpy = jest.spyOn(findAccountByTokenRepositoryStub, 'findByToken')
    await sut.findByToken('any_token', 'any_role')
    expect(findByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should returns null if FindAccountByTokenRepository returns null', async () => {
    const { sut, findAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(findAccountByTokenRepositoryStub, 'findByToken').mockReturnValueOnce(
      Promise.resolve(null)
    )
    const account = await sut.findByToken('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should returns an account on succeeds', async () => {
    const { sut } = makeSut()
    const account = await sut.findByToken('any_token', 'any_role')
    expect(account).toEqual(mockAccountModel())
  })
})
