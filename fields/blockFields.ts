import type { Field } from 'payload'

export const blockFields = ({
  name,
  fields,
}: {
  name: string
  fields: Field[]
}): Field => {
  return {
    name,
    type: 'group',
    fields,
  }
}