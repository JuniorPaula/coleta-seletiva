import { AccountModel } from '@/domain/model/account'

export type AddAccountModel = Omit<AccountModel, 'id'>

export interface AddAccount {
  create: (account: AddAccountModel) => Promise<AccountModel>
}
