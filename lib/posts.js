import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import rehypeHighlight from 'rehype-highlight'

const postsDirectory = path.join(process.cwd(), 'muxuzone')

// 获取单篇文章内容
export async function getPostBySlug(slug, category) {
  const decodedCategory = decodeURIComponent(category)  // 解码 category
  const decodedSlug = decodeURIComponent(slug)          // 解码 slug
  const fullPath = path.join(postsDirectory, decodedCategory, `${decodedSlug}.md`)
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 使用 gray-matter 解析文件内容，获得元数据和正文部分
    const { data, content } = matter(fileContents)

  // 解析 Markdown，并启用代码高亮
  const processedContent = await remark()
  .use(remarkRehype) // 将 Markdown 转为 Rehype 格式
  .use(rehypeHighlight) // 添加代码高亮
  .use(rehypeStringify) // 将 HTML AST 转为字符串形式
    .process(content)

  const contentHtml = processedContent.toString()

    return {
      slug,
      category: decodedCategory,
      contentHtml,
      ...data,
    }
  } catch (error) {
    console.error(`Error reading post file at ${fullPath}: `, error)
    return null
  }
}
// 获取所有文章的路径和元数据
export function getPostSlugs() {
  const categories = fs.readdirSync(postsDirectory)
  let slugs = []

  categories.forEach((category) => {
    const categoryPath = path.join(postsDirectory, category)
    const files = fs.readdirSync(categoryPath)

    files.forEach((file) => {
      if (file.endsWith('.md')) {
        const slug = file.replace('.md', '')
        slugs.push({
          slug,
          category,
        })
      }
    })
  })

  // 确保返回的是数组
  console.log(slugs)  // 添加日志，调试返回值
  return slugs
}