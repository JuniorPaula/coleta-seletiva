import { AddAccountRepository } from '@/data/protocols/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/account/load-by-email-repository'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { AccountModel } from '@/domain/model/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/create-account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepositoryStub: AddAccountRepository,
    private readonly loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  ) {}

  async create (account: AddAccountModel): Promise<AccountModel> {
    const hasAccount = await this.loadAccountByEmailRepositoryStub.loadByEmail(account.email)
    if (!hasAccount) {
      const hashedPassword = await this.encrypter.encrypt(account.password)
      const accountModel = await this.addAccountRepositoryStub.add({
        name: account.name,
        email: account.email,
        password: hashedPassword
      })

      return accountModel
    }

    return null
  }
}
