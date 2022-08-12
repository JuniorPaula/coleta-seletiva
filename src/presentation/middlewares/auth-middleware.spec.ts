import { FindAccountByToken } from '@/domain/usecases/account/find-account-by-token'
import { AccountModel } from '@/domain/model/account'
import { AccessDeniedError } from '../errors'
import { forbiden } from '../helpers/http-helpers'
import { AuthMiddleware } from './auth-middleware'
import { HttpRequest } from '../protocols'

const mockAccountModel = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})

const mockHttpRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const mockFindAccountByToken = (): FindAccountByToken => {
  class FindAccountByTokenStub implements FindAccountByToken {
    async findByToken (accessToken: string, role?: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new FindAccountByTokenStub()
}

type SutTypes = {
  sut: AuthMiddleware
  findAccountByTokenStub: FindAccountByToken
}

const makeSut = (): SutTypes => {
  const findAccountByTokenStub = mockFindAccountByToken()
  const sut = new AuthMiddleware(findAccountByTokenStub)

  return {
    sut,
    findAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should returns 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbiden(new AccessDeniedError()))
  })

  test('Should call FindAccountByToken with correct accessToken', async () => {
    const { sut, findAccountByTokenStub } = makeSut()
    const findSpy = jest.spyOn(findAccountByTokenStub, 'findByToken')
    await sut.handle(mockHttpRequest())
    expect(findSpy).toHaveBeenCalledWith('any_token')
  })
})
