import type { Block } from 'payload'

import { blockFields } from '../fields/blockFields'
import codeBlips from '../fields/codeBlips'

export const Code: Block = {
  slug: 'code',
  fields: [
    blockFields({
      name: 'codeFields',
      fields: [
        {
          name: 'filename',
          type: 'text',
          label: 'Filename (optional)',
          admin: {
            description: 'Optional filename to display above the code block',
          },
        },
        {
          name: 'language',
          type: 'select',
          defaultValue: 'none',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'JavaScript',
              value: 'javascript',
            },
            {
              label: 'TypeScript',
              value: 'typescript',
            },
            {
              label: 'Python',
              value: 'python',
            },
            {
              label: 'HTML',
              value: 'html',
            },
            {
              label: 'CSS',
              value: 'css',
            },
            {
              label: 'React JSX',
              value: 'jsx',
            },
            {
              label: 'React TSX',
              value: 'tsx',
            },
            {
              label: 'JSON',
              value: 'json',
            },
            {
              label: 'Markdown',
              value: 'markdown',
            },
            {
              label: 'Bash/Shell',
              value: 'bash',
            },
            {
              label: 'SQL',
              value: 'sql',
            },
            {
              label: 'Go',
              value: 'go',
            },
            {
              label: 'Rust',
              value: 'rust',
            },
            {
              label: 'Java',
              value: 'java',
            },
            {
              label: 'C++',
              value: 'cpp',
            },
            {
              label: 'YAML',
              value: 'yaml',
            },
          ],
        },
        {
          name: 'code',
          type: 'code',
          required: true,
        },
        codeBlips,
      ],
    }),
  ],
}