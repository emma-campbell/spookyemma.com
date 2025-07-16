import type { ArrayField } from 'payload'

const codeBlips: ArrayField = {
  name: 'codeBlips',
  type: 'array',
  fields: [
    {
      name: 'row',
      type: 'number',
      required: true,
    },
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'enableLink',
      type: 'checkbox',
    },
  ],
  labels: {
    plural: 'Blips',
    singular: 'Blip',
  },
}

export default codeBlips