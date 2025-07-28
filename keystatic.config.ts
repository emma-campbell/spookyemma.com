import { config, fields, collection, singleton } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'SpookyEmma Blog'
    }
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: {
            label: 'URL Slug',
            description: 'The URL-friendly version of the title'
          }
        }),
        description: fields.text({
          label: 'Description',
          multiline: true
        }),
        published: fields.date({
          label: 'Published Date',
          defaultValue: { kind: 'today' }
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' }
          ],
          defaultValue: 'draft'
        }),
        entry: fields.select({
          label: 'Entry Type',
          options: [
            { label: 'Note', value: 'note' },
            { label: 'Essay', value: 'essay' },
            { label: 'How-to', value: 'how-to' },
            { label: 'Micro', value: 'micro' },
            { label: 'Experiment', value: 'experiment' }
          ],
          defaultValue: 'note'
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: props => props.value || 'Enter tag'
          }
        ),
        content: fields.mdx({
          label: 'Content',
          description: 'The main content of the blog post (MDX format)',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/'
            }
          },
          components: {
            Aside: wrapper({
              label: 'Aside',
              description: 'A styled aside component for additional content',
              schema: {
                title: fields.text({
                  label: 'Title',
                  description: 'Optional title for the aside'
                }),
                position: fields.select({
                  label: 'Position',
                  options: [
                    { label: 'Left', value: 'left' },
                    { label: 'Right', value: 'right' }
                  ],
                  defaultValue: 'left'
                }),
                styled: fields.checkbox({
                  label: 'Styled',
                  description: 'Apply italic styling and reduced opacity',
                  defaultValue: false
                })
              }
            })
          }
        })
      },
    }),
    tags: collection({
      label: 'Tags',
      slugField: 'slug',
      path: 'content/tags/*',
      format: { contentField: 'description' },
      schema: {
        name: fields.text({
          label: 'Name',
          validation: { isRequired: true }
        }),
        slug: fields.slug({
          name: { label: 'Slug' },
          slug: {
            label: 'URL Slug',
            description: 'The URL-friendly version of the name'
          }
        }),
        description: fields.markdoc({
          label: 'Description',
          description: 'Optional description for the tag'
        })
      },
    }),
    notebooks: collection({
      label: 'Notebooks',
      slugField: 'slug',
      path: 'content/notebooks/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({
          label: 'Title',
          validation: { isRequired: true }
        }),
        description: fields.text({
          label: 'Description',
          validation: { isRequired: true },
          multiline: true
        }),
        slug: fields.slug({
          name: { label: 'Slug' },
          slug: {
            label: 'URL Slug',
            description: 'The URL-friendly version of the title'
          }
        }),
        publishedDate: fields.date({
          label: 'Published Date',
          description: 'Date when the notebook was published'
        }),
        tags: fields.array(
          fields.relationship({
            label: 'Tag',
            description: 'Select a tag',
            collection: 'tags',
          }),
          {
            label: 'Tags',
            itemLabel: props => props.value || 'Select a tag'
          }
        ),
        content: fields.markdoc({
          label: 'Content',
          description: 'The main content of the notebook'
        })
      },
    }),
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'content/settings/site',
      schema: {
        siteName: fields.text({
          label: 'Site Name',
          defaultValue: 'SpookyEmma'
        }),
        siteDescription: fields.text({
          label: 'Site Description',
          multiline: true
        }),
        seoDefaults: fields.object({
          metaTitle: fields.text({ label: 'Default Meta Title' }),
          metaDescription: fields.text({
            label: 'Default Meta Description',
            multiline: true
          }),
          ogImage: fields.image({
            label: 'Default OG Image',
            directory: 'public/images/seo',
            publicPath: '/images/seo/'
          })
        })
      }
    })
  }
});