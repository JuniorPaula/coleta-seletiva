import { AccountModel } from '@/domain/model/account'

export interface FindAccountByTokenRepository {
  findByToken: (token: string, role?: string) => Promise<AccountModel>
}
