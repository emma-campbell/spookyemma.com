import sharp from 'sharp'
import { lexicalEditor, BlocksFeature, LinkFeature, UploadFeature } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { Post } from './collections/post'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Tag } from './collections/tag'
import { Notebook } from './collections/notebook'
import { s3Storage } from '@payloadcms/storage-s3'
import { Upload } from './collections/upload'
import computeBlurhash from 'payload-blurhash-plugin';
import { Code } from './blocks/Code'
import { Table } from './blocks/Table'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      LinkFeature({
        fields: [
          {
            name: 'rel',
            label: 'Rel Attribute',
            type: 'select',
            options: [
              'noopener', 'noreferrer', 'nofollow'
            ]
          },
          {
            name: 'target',
            label: 'Target',
            type: 'select',
            options: [
              '_blank', '_self', '_parent', '_top'
            ]
          },
          {
            name: 'href',
            label: 'Href',
            type: 'text',
            required: true,
            admin: {
              description: 'The href attribute for the link'
            }
          }
        ]
      }),
      UploadFeature({
        collections: {
          uploads: {
            fields: [
              {
                name: 'alt',
                type: 'text',
                required: true,
                admin: {
                  description: 'The alt text for the image'
                }
              }
            ]
          }
        }
      }),
      BlocksFeature({
        blocks: [Code, Table],
      }),
    ],
  }),

  // Define and configure your collections in this array
  collections: [Post, Tag, Notebook, Upload],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
  plugins: [
    seoPlugin({
      collections: [Post],
    }),
    s3Storage({
      collections: {
        uploads: true,
      },
      bucket: process.env.SPACES_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.SPACES_KEY!,
          secretAccessKey: process.env.SPACES_SECRET!,
        },
        region: process.env.SPACES_REGION!,
        endpoint: process.env.SPACES_ENDPOINT!,
        forcePathStyle: false,
      },
    }),
    computeBlurhash({
      collections: [
        'uploads'
      ]
    }),
  ],
})