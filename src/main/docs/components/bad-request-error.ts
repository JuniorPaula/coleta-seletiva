export const badRequestError = {
  description: 'Requisição inválida',
  content: {
    'applicatio/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
