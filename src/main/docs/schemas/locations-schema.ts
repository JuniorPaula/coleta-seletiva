export const locationsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    location: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
        latitude: {
          type: 'number'
        },
        longitude: {
          type: 'number'
        },
        city: {
          type: 'string'
        },
        uf: {
          type: 'string'
        }
      },
      required: ['name', 'email', 'latidude', 'longitude', 'city', 'uf']
    },
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: {
            type: 'string'
          }
        },
        required: ['title']
      }
    }
  },
  required: ['id', 'location', 'items']
}
