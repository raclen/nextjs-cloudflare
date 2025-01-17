// app/posts/[category]/[slug]/page.js

import { getPostBySlug } from '../../../../lib/posts'
import styles from './page.module.css' // 引入CSS模块

export default async function PostPage({ params }) {
  const { slug, category } = params
  const post = await getPostBySlug(slug, category)

  if (!post) {
    return <h1>文章不存在</h1>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.date}>{post.date}</p>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  )
}
