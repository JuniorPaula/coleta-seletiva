import { FindAccountByTokenRepository } from '@/data/protocols/account/find-account-by-token-repository'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { AccountModel } from '@/domain/model/account'
import { FindAccountByToken } from '@/domain/usecases/account/find-account-by-token'

export class DbFindAccountByToken implements FindAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly findAccountByTokenRepositoryStub: FindAccountByTokenRepository
  ) {}

  async findByToken (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      await this.findAccountByTokenRepositoryStub.findByToken(accessToken, role)
    }
    return await Promise.resolve(null)
  }
}
