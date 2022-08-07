import { LoadAccountByEmailRepository } from '@/data/protocols/account/load-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/account/update-access-token-repository'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { TokenGeneration } from '@/data/protocols/criptography/token-generator'
import { Authentication, AuthenticationModel } from '@/domain/usecases/auth/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGeneration: TokenGeneration,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGeneration.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
