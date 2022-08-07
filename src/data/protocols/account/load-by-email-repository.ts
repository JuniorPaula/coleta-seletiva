import { AccountModel } from '@/domain/model/account'

export interface LoadAccountByEmailRepository {
  load: (email: string) => Promise<AccountModel>
}
