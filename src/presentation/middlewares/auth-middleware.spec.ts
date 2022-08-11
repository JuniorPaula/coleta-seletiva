import { FindAccountByToken } from '@/domain/usecases/account/find-account-by-token'
import { AccountModel } from '@/domain/model/account'
import { AccessDeniedError } from '../errors'
import { forbiden } from '../helpers/http-helpers'
import { AuthMiddleware } from './auth-middleware'

const mockAccountModel = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})

describe('Auth Middleware', () => {
  test('Should returns 403 if no x-access-token exists in headers', async () => {
    class FindAccountByTokenStub implements FindAccountByToken {
      async findByToken (accessToken: string, role?: string): Promise<AccountModel> {
        return await Promise.resolve(mockAccountModel())
      }
    }
    const findAccountByTokenStub = new FindAccountByTokenStub()
    const sut = new AuthMiddleware(findAccountByTokenStub)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbiden(new AccessDeniedError()))
  })

  test('Should call FindAccountByToken with correct accessToken', async () => {
    class FindAccountByTokenStub implements FindAccountByToken {
      async findByToken (accessToken: string, role?: string): Promise<AccountModel> {
        return await Promise.resolve(mockAccountModel())
      }
    }
    const findAccountByTokenStub = new FindAccountByTokenStub()
    const findSpy = jest.spyOn(findAccountByTokenStub, 'findByToken')
    const sut = new AuthMiddleware(findAccountByTokenStub)
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(findSpy).toHaveBeenCalledWith('any_token')
  })
})
