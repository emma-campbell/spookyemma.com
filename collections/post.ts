import { convertLexicalToMarkdown, editorConfigFactory } from "@payloadcms/richtext-lexical";
import type { CollectionConfig, RichTextField } from "payload";
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const Post: CollectionConfig = {
  slug: "post",
  dbName: "post",
  labels: {
    singular: "Post",
    plural: "Posts",
  },
  disableDuplicate: true,
  fields: [
    {
        name: "title",
        type: "text",
        required: true,
        admin: {
            position: "sidebar",
        },
    },
    {
        name: "content",
        type: "richText",
    },
    {
        name: "published",
        type: "checkbox",
        defaultValue: false,
        admin: {
            hidden: true,
        },
    },
    {
        name: "publishedDate",
        label: "Publish Date",
        type: "date",
        admin: {
            position: "sidebar",
        },
        hooks: {}
    },
    {
        name: "markdown",
        type: "textarea",
        admin: {
            hidden: true,
        },
        hooks: {
            afterRead: [
                ({ siblingData, siblingFields }) => {
                    const data: SerializedEditorState = siblingData["content"];

                    if (!data) {
                        return "";
                    }
                    
                    return convertLexicalToMarkdown({
                        data,
                        editorConfig: editorConfigFactory.fromField({
                          field: siblingFields.find(
                            (field) =>
                              'name' in field && field.name === 'content',
                          ) as RichTextField,
                        }),
                      });
                }
            ],
            beforeChange: [
                ({ siblingData }) => {
                  // Ensure that the markdown field is not saved in the database
                  delete siblingData['markdown']
                  return null
                },
            ],
        }
    }
  ],
};