import { AccountModel } from '@/domain/model/account'
import { AddAccountModel } from '@/domain/usecases/account/create-account'

export interface AddAccountRepository {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
