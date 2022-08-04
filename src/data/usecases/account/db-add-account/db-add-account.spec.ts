import { AddAccountRepository } from '@/data/protocols/account/add-account-repository'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { AccountModel } from '@/domain/model/account'
import { AddAccountModel } from '@/domain/usecases/account/create-account'
import { DbAddAccount } from './db-add-account'

const mockAccount = (): Omit<AccountModel, 'id'> => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

const mockEncrypter = (): Encrypter => {
  class EncrypterStub {
    async encrypt (email: string): Promise<string> {
      return await Promise.resolve('encrypted_password')
    }
  }
  return new EncrypterStub()
}

const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return await Promise.resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password'
      })
    }
  }

  return new AddAccountRepositoryStub()
}

type SutTypes = {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = mockEncrypter()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.create(mockAccount())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throws if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockResolvedValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.create(mockAccount())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.create(mockAccount())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'encrypted_password'
    })
  })

  test('Should throws if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockResolvedValueOnce(
      Promise.reject(new Error())
    )
    const promise = sut.create(mockAccount())
    await expect(promise).rejects.toThrow()
  })
})
