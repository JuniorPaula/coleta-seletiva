export const addLocationSchema = {
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
    },
    items: {
      type: 'array',
      items: {
        type: 'string',
        properties: {
          id: {
            type: 'string'
          }
        },
        required: ['id']
      }
    }
  },
  required: ['name', 'email', 'latitude', 'longitude', 'city', 'uf', 'items']
}
