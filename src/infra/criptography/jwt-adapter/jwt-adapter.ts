import jwt from 'jsonwebtoken'
import { TokenGeneration } from '@/data/protocols/criptography/token-generator'
import { Decrypter } from '@/data/protocols/criptography/decrypter'

export class JwtAdapter implements TokenGeneration, Decrypter {
  constructor (private readonly secret: string) {}

  async generate (id: string): Promise<string> {
    const accessToken = jwt.sign({ id }, this.secret)
    return accessToken
  }

  async decrypt (value: string): Promise<string> {
    jwt.verify(value, this.secret)
    return await Promise.resolve(null)
  }
}
