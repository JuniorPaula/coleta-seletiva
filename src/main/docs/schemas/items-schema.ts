export const itemsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    image: {
      type: 'string'
    }
  },
  required: ['id', 'title', 'image']
}
