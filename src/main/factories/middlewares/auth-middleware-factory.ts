import env from '@/main/config/env'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { Middleware } from '@/presentation/protocols/middleware'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { DbFindAccountByToken } from '@/data/usecases/account/db-find-account-by-token/db-find-account-by-token'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbFindAccountByToken = new DbFindAccountByToken(jwtAdapter, accountMongoRepository)
  return new AuthMiddleware(dbFindAccountByToken, role)
}
