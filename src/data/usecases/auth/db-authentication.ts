import { LoadAccountByEmailRepository } from '@/data/protocols/account/load-by-email-repository'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { TokenGeneration } from '@/data/protocols/criptography/token-generator'
import { Authentication, AuthenticationModel } from '@/domain/usecases/auth/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGeneration: TokenGeneration
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
      await this.tokenGeneration.generate(account.id)
    }
    return null
  }
}
