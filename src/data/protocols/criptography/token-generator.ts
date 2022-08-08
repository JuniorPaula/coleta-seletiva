export interface TokenGeneration {
  generate: (id: string) => Promise<string>
}
