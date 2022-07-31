import { MissingParamError } from '@/presentation/errors'
import { SignupController } from './signup'

describe('Signup Controller', () => {
  test('Should return 400 if no name is provide', async () => {
    const sut = new SignupController()
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
})
