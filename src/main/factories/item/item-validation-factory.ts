import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation } from '@/validations/validator/required-field-validation'
import { ValidationComposite } from '@/validations/validator/validation-composite'

export const makeItemValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['title', 'image']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
