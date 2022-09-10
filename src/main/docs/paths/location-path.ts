export const LocationsPath = {
  get: {
    tags: ['Locations'],
    summary: 'API para listar os pontos de coleta',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/getLocation'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Sucesso'
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
