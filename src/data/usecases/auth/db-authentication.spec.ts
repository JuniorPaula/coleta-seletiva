import { LoadAccountByEmailRepository } from '@/data/protocols/account/load-by-email-repository'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { TokenGeneration } from '@/data/protocols/criptography/token-generator'
import { AccountModel } from '@/domain/model/account'
import { AuthenticationModel } from '@/domain/usecases/auth/authentication'
import { DbAuthentication } from './db-authentication'

const mockAccountModel = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})

const mockAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const mockloadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }

  return new HashComparerStub()
}

const mockTokenGeneration = (): TokenGeneration => {
  class TokenGenerationStub implements TokenGeneration {
    async generate (id: string): Promise<string> {
      return await Promise.resolve('access_token')
    }
  }

  return new TokenGenerationStub()
}

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  tokenGenerationStub: TokenGeneration
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockloadAccountByEmailRepository()
  const hashComparerStub = mockHashComparer()
  const tokenGenerationStub = mockTokenGeneration()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, tokenGenerationStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGenerationStub
  }
}

describe('Db Authentication usecase', () => {
  test('Should call loadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(mockAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if loadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if loadAccountByEmailRepository return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(null)
    const accessToken = await sut.auth(mockAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call HashCompare with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(mockAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashCompare throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashCompare return false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(
      Promise.resolve(false))
    const accessToken = await sut.auth(mockAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call TokenGeneration with correct value', async () => {
    const { sut, tokenGenerationStub } = makeSut()
    const generateSpy = jest.spyOn(tokenGenerationStub, 'generate')
    await sut.auth(mockAuthentication())
    expect(generateSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should throw if TokenGeneration throws', async () => {
    const { sut, tokenGenerationStub } = makeSut()
    jest.spyOn(tokenGenerationStub, 'generate').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
