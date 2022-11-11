export default {
  type: "array",
  properties: {
    title: { type: 'string' },
    author: { type: 'string' }
  },
  required: ['title', 'author']
} as const;
