import { DbAddAccount } from '@/data/usecases/account/db-add-account/db-add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { SignupController } from '@/presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '@/validations/validator/email-validator-adapter'

export const makeSignupController = (): SignupController => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountRepository)

  return new SignupController(emailValidator, dbAddAccount)
}
