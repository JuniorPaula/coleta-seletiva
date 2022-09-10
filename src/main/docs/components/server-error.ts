export const serverError = {
  description: 'Problemas no servidor',
  content: {
    'applicatio/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
