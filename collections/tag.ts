import { CollectionConfig } from "payload";

export const Tag: CollectionConfig = {
    slug: "tag",
    labels: {
        singular: "Tag",
        plural: "Tags",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "slug",
            type: "text",
            required: true,
            hooks: {}
        }
    ]
}