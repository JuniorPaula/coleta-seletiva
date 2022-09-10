export const LocationsPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Locations'],
    summary: 'API para cadastrar um ponto de coleta',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addLocation'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Sucesso'
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
  },
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
