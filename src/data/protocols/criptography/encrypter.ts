export interface Encrypter {
  encrypt: (email: string) => Promise<string>
}
