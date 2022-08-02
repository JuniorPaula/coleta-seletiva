import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { AccountModel } from '@/domain/model/account'
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

type SutTypes = {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const encrypterStub = mockEncrypter()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}

describe('DbAddAccount usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.create(mockAccount())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
