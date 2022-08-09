export class EmailAlreadyExists extends Error {
  constructor () {
    super('Email already exists')
    this.name = 'Email already exists'
  }
}
