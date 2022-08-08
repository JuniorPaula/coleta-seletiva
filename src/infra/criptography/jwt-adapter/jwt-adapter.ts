import jwt from 'jsonwebtoken'
import { TokenGeneration } from '@/data/protocols/criptography/token-generator'

export class JwtAdapter implements TokenGeneration {
  constructor (private readonly secret: string) {}

  async generate (id: string): Promise<string> {
    const accessToken = jwt.sign({ id }, this.secret)
    return accessToken
  }
}
