export const itemPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Items'],
    summary: 'API para criar um item',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addItem'
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
    tags: ['Items'],
    summary: 'API para listar items',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/getItems'
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
