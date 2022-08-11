import env from '@/main/config/env'
import { DbAddAccount } from '@/data/usecases/account/db-add-account/db-add-account'
import { DbAuthentication } from '@/data/usecases/auth/db-authentication'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { SignupController } from '@/presentation/controllers/signup/signup'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignupController = (): SignupController => {
  const salt = 12
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountRepository, accountRepository)

  const dbAuthentication = new DbAuthentication(
    accountRepository,
    bcryptAdapter,
    jwtAdapter,
    accountRepository
  )

  return new SignupController(dbAddAccount, makeSignupValidation(), dbAuthentication)
}
