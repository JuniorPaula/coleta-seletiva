import env from '@/main/config/env'
import { DbAuthentication } from '@/data/usecases/auth/db-authentication'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { LoginController } from '@/presentation/controllers/login/login'
import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): LoginController => {
  const salt = 12

  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )

  return new LoginController(dbAuthentication, makeLoginValidation())
}
