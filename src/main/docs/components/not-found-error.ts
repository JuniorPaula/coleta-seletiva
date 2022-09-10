export const notFoundError = {
  description: 'API não encontrada',
  content: {
    'applicatio/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
