import { AddAccountRepository } from '@/data/protocols/account/add-account-repository'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { AccountModel } from '@/domain/model/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/create-account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepositoryStub: AddAccountRepository
  ) {}

  async create (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    await this.addAccountRepositoryStub.add(
      Object.assign({}, account, { password: hashedPassword })
    )
    return await Promise.resolve(null)
  }
}
