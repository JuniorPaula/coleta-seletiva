import jwt from 'jsonwebtoken'
import { TokenGeneration } from '@/data/protocols/criptography/token-generator'
import { Decrypter } from '@/data/protocols/criptography/decrypter'

export class JwtAdapter implements TokenGeneration, Decrypter {
  constructor (private readonly secret: string) {}

  async generate (id: string): Promise<string> {
    const accessToken = jwt.sign({ id }, this.secret)
    return accessToken
  }

  async decrypt (token: string): Promise<string> {
    const value: any = jwt.verify(token, this.secret)
    return value
  }
}
