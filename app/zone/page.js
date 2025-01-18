// app/posts/page.js

import { getPostSlugs } from '../../lib/posts'
import Link from 'next/link'
import styles from './page.module.css'

export default async function PostsPage() {
  const slugs = getPostSlugs()

  if (!Array.isArray(slugs)) {
    return <p>无法加载文章列表</p>
  }

  return (
    <div style={{background: 'antiquewhite'}}>
    <div className={styles.container}>
      <h1 className={styles.title}>文章列表</h1>
      <ul className={styles.list}>
        {slugs.map(({ slug, category }) => {
          const encodedCategory = encodeURIComponent(category)
          const encodedSlug = encodeURIComponent(slug)

          return (
            <li key={slug} className={styles.item}>
              <Link href={`/posts/${encodedCategory}/${encodedSlug}`} className={styles.link}>
                {slug}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
    </div>
  )
}
