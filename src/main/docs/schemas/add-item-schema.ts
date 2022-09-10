export const addItemSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    image: {
      type: 'string'
    }
  },
  required: ['title', 'image']
}
