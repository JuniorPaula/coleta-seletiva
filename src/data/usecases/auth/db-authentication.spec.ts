import { LoadAccountByEmailRepository } from '@/data/protocols/account/load-by-email-repository'
import { AccountModel } from '@/domain/model/account'
import { DbAuthentication } from './db-authentication'

describe('Db Authentication usecase', () => {
  test('Should call loadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async load (email: string): Promise<AccountModel> {
        const account: AccountModel = {
          id: 'valid_id',
          name: 'valid_name',
          email: 'valid_email',
          password: 'valid_password'
        }
        return await Promise.resolve(account)
      }
    }

    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
