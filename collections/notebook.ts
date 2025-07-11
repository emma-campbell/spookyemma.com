import { CollectionConfig } from "payload";

export const Notebook: CollectionConfig = {
    slug: "notebook",
    labels: {
        singular: "Notebook",
        plural: "Notebooks",
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "text",
            required: true,
        },
        {
            name: "slug",
            type: "text",
            required: true,
        }
    ]
}