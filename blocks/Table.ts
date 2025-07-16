import type { Block } from 'payload'
import { blockFields } from '../fields/blockFields'

export const Table: Block = {
  slug: 'table',
  fields: [
    blockFields({
      name: 'tableFields',
      fields: [
        {
          name: 'headers',
          type: 'array',
          label: 'Table Headers',
          required: true,
          fields: [
            {
              name: 'header',
              type: 'text',
              required: true,
            },
            {
              name: 'align',
              type: 'select',
              defaultValue: 'left',
              options: [
                {
                  label: 'Left',
                  value: 'left',
                },
                {
                  label: 'Center',
                  value: 'center',
                },
                {
                  label: 'Right',
                  value: 'right',
                },
              ],
            },
          ],
        },
        {
          name: 'rows',
          type: 'array',
          label: 'Table Rows',
          required: true,
          fields: [
            {
              name: 'cells',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'content',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Table Caption (optional)',
          admin: {
            description: 'Optional caption to display below the table',
          },
        },
      ],
    }),
  ],
}