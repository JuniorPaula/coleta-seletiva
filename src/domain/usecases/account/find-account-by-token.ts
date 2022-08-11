import { AccountModel } from '@/domain/model/account'

export interface FindAccountByToken {
  findByToken: (accessToken: string, role?: string) => Promise<AccountModel>
}
