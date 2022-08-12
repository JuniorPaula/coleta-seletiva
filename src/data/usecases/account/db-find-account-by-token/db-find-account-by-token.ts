import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { AccountModel } from '@/domain/model/account'
import { FindAccountByToken } from '@/domain/usecases/account/find-account-by-token'

export class DbFindAccountByToken implements FindAccountByToken {
  constructor (private readonly decrypter: Decrypter) {}

  async findByToken (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return await Promise.resolve(null)
  }
}
