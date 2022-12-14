import { FindAccountByToken } from '@/domain/usecases/account/find-account-by-token'
import { AccountModel } from '@/domain/model/account'
import { AccessDeniedError } from '../errors'
import { forbiden, ok, serverError } from '../helpers/http-helpers'
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

const makeSut = (role?: string): SutTypes => {
  const findAccountByTokenStub = mockFindAccountByToken()
  const sut = new AuthMiddleware(findAccountByTokenStub, role)

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
    const role = 'any_role'
    const { sut, findAccountByTokenStub } = makeSut(role)
    const findSpy = jest.spyOn(findAccountByTokenStub, 'findByToken')
    await sut.handle(mockHttpRequest())
    expect(findSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('Should returns 403 if FindAccountByToken returns null', async () => {
    const { sut, findAccountByTokenStub } = makeSut()
    jest.spyOn(findAccountByTokenStub, 'findByToken').mockReturnValueOnce(null)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbiden(new AccessDeniedError()))
  })

  test('Should returns 200 if FindAccountByToken returns an account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockHttpRequest())
    expect(httpResponse).toEqual(ok({
      account_id: 'valid_id'
    }))
  })

  test('Should returns 500 if FindAccountByToken throws', async () => {
    const { sut, findAccountByTokenStub } = makeSut()
    jest.spyOn(findAccountByTokenStub, 'findByToken').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const httpResponse = await sut.handle(mockHttpRequest())
    expect(httpResponse).toEqual(serverError())
  })
})
