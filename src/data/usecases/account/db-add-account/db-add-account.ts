import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { AccountModel } from '@/domain/model/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/create-account'

export class DbAddAccount implements AddAccount {
  constructor (private readonly encrypter: Encrypter) {}

  async create (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return await Promise.resolve(null)
  }
}
