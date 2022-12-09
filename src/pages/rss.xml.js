import rss from '@astrojs/rss';

const blogImportResult = import.meta.glob('../pages/*/*.md', { eager: true });
const blogs = Object.values(blogImportResult);

export const get = () => rss(
{
  stylesheet: '/styles/rss.xsl',
  title: 'Versun’s Space',
  description:"",
  site: import.meta.env.SITE,
  items: blogs.map((blog) => ({
    link: blog.url,
    title: blog.frontmatter.title,
    createDate: blog.frontmatter.create,
  }))
}
);