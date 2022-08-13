import { AuthenticationParams } from '@/domain/model/authentication-model'

export type AuthenticationModel = {
  email: string
  password: string
}

export interface Authentication {
  auth: (authentication: AuthenticationModel) => Promise<AuthenticationParams>
}
