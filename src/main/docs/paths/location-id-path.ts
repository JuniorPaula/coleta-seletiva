export const locationIdPath = {
  get: {
    tags: ['Locations'],
    summary: 'API para consultar um ponto de coleta por específico',
    parameters: [{
      in: 'path',
      name: 'locationId',
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
