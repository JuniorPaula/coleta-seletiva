export const unauthorizedError = {
  description: 'Credenciais inválidas',
  content: {
    'applicatio/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
