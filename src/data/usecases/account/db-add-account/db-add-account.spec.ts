import { DbAddAccount } from './db-add-account'

describe('DbAddAccount usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (email: string): Promise<string> {
        return await Promise.resolve('encrypted_password')
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.create(account)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
