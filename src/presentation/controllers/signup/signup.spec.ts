import { MissingParamError, ServerError } from '@/presentation/errors'
import { AccountModel, AddAccount, AddAccountModel } from './signup-protocols'
import { SignupController } from './signup'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest } from '../login/login-protocols'

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

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

type SutTypes = {
  sut: SignupController
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const sut = new SignupController(addAccountStub, validationStub)
  return {
    sut,
    addAccountStub,
    validationStub
  }
}

describe('Signup Controller', () => {
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

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'create').mockImplementationOnce(() => {
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

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'invalid@mail.com',
        password: 'any_pass',
        passwordConfirmation: 'any_pass'
      }
    }
    const httpResponse = await sut.handle(httpResquest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(mockAccount())
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
