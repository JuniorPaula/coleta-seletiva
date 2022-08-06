import {
  badRequest,
  serverError,
  ok,
  unauthorized,
  MissingParamError,
  Authentication,
  Validation,
  AuthenticationModel
} from './login-protocols'
import { HttpRequest } from '../item/item-protocols'
import { LoginController } from './login'

const mockHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_mail@mail.com',
    password: 'any_password'
  }
})

const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationModel): Promise<string> {
      return await Promise.resolve('access_token')
    }
  }

  return new AuthenticationStub()
}

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

type SutTypes = {
  sut: LoginController
  authenticationStub: Authentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication()
  const validationStub = mockValidation()
  const sut = new LoginController(authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}

describe('LoginController', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockHttpRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 401 if invalid credentils are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockResolvedValueOnce(
      Promise.resolve(null)
    )
    const httpResponse = await sut.handle(mockHttpRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const httpResponse = await sut.handle(mockHttpRequest())
    expect(httpResponse).toEqual(serverError())
  })

  test('Should return 200 if valid credentils are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockHttpRequest())
    expect(httpResponse).toEqual(ok({ access_token: 'access_token' }))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'valid@mail.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }
    await sut.handle(httpResquest)
    expect(validateSpy).toHaveBeenCalledWith(httpResquest.body)
  })

  test('Should return 400 if Validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(
      new MissingParamError('any_field')
    )
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'invalid@mail.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }
    const httpResponse = await sut.handle(httpResquest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
