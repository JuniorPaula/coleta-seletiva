export const forbiddenError = {
  description: 'Accesso negado',
  content: {
    'applicatio/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
