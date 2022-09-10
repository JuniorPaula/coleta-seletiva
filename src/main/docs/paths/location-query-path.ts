export const locationQueryPath = {
  get: {
    tags: ['Locations'],
    summary: 'API para consultar um ponto de coleta por específico por cidades',
    parameters: [{
      in: 'query',
      name: 'city',
      required: true,
      schema: {
        type: 'string'
      }
    }, {
      in: 'query',
      name: 'uf',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/locationsSchema'
            }
          }
        }
      },
      403: {
        $ref: '#components/forbiddenError'
      },
      404: {
        $ref: '#components/notFoundError'
      },
      500: {
        $ref: '#components/serverError'
      }
    }
  }
}
