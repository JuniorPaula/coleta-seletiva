import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helpers'
import { LoginController } from './login'

type SutTypes = {
  sut: LoginController
}

const makeSut = (): SutTypes => {
  const sut = new LoginController()
  return {
    sut
  }
}

describe('LoginController', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const HttpResponse = await sut.handle(httpRequest)
    expect(HttpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com'
      }
    }
    const HttpResponse = await sut.handle(httpRequest)
    expect(HttpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
