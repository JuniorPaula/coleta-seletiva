import { LoadAccountByEmailRepository } from '@/data/protocols/account/load-by-email-repository'
import { AccountModel } from '@/domain/model/account'
import { AuthenticationModel } from '@/domain/usecases/auth/authentication'
import { DbAuthentication } from './db-authentication'

const mockAccountModel = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
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

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockloadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('Db Authentication usecase', () => {
  test('Should call loadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(mockAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
