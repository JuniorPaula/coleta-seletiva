import { InvalidParamError, MissingParamError, ServerError } from '@/presentation/errors'
import { EmailValidator } from '@/validations/protocols/email-validator'
import { AccountModel, AddAccount, AddAccountModel } from './signup-protocols'
import { SignupController } from './signup'

const mockAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid@mail.com',
  password: 'valid_password'
})

const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async create (account: AddAccountModel): Promise<AccountModel> {
      return await Promise.resolve(mockAccount())
    }
  }

  return new AddAccountStub()
}

const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

type SutTypes = {
  sut: SignupController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const addAccountStub = mockAddAccount()
  const sut = new SignupController(emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

describe('Signup Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpResquest = {
      body: {
        email: 'any@mail.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }
    const httpResponse = await sut.handle(httpResquest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpResquest = {
      body: {
        name: 'any_name',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }
    const httpResponse = await sut.handle(httpResquest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        passwordConfirmation: 'any_pass'
      }
    }
    const httpResponse = await sut.handle(httpResquest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_pass'
      }
    }
    const httpResponse = await sut.handle(httpResquest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if password confirmation fails', async () => {
    const { sut } = makeSut()
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_pass',
        passwordConfirmation: 'invalid_pass'
      }
    }
    const httpResponse = await sut.handle(httpResquest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'invalid@mail.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }
    const httpResponse = await sut.handle(httpResquest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call email validator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const emailSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'valid@mail.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }
    await sut.handle(httpResquest)
    expect(emailSpy).toHaveBeenCalledWith('valid@mail.com')
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'invalid@mail.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }
    const httpResponse = await sut.handle(httpResquest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const createSpy = jest.spyOn(addAccountStub, 'create')
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'valid@mail.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }
    await sut.handle(httpResquest)
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'valid@mail.com',
      password: 'any_pass'
    })
  })
})
