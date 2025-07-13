import { CollectionConfig } from "payload";

export const Upload: CollectionConfig = {
    slug: 'uploads',
    upload: {
        staticDir: 'uploads',
        imageSizes: [
            {
                name: 'thumbnail',
                width: 400,
                height: 300,
                position: 'centre',
            },
            {
                name: 'card',
                width: 768,
                height: 1024,
                position: 'centre',
            },
            {
                name: 'tablet',
                width: 1024,
                height: undefined,
                position: 'centre',
            },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
    },
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