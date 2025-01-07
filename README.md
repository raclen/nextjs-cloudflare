# 使用 Next.js 构建博客应用并部署到 Cloudflare Pages

在本教程中，我们将一步步使用 Next.js 构建一个简单博客应用，并扩展实现动态数据获取和股票历史数据查询功能，最终部署到 Cloudflare Pages。

---

## **1. 创建 Next.js 博客应用**

### **初始化项目**
首先使用 `create-next-app` 创建一个新的 Next.js 项目：
```bash
npx create-next-app@latest nextjs-blog
cd nextjs-blog
```

安装依赖并启动开发服务器：
```bash
npm install
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 确保项目成功运行。

### **添加博客功能**

1. **首页展示博客列表**  
   编辑 `pages/index.tsx`，展示博客列表：

   ```typescript
   import Link from 'next/link';

   export default function Home() {
       const blogPosts = [
           { id: '1', title: 'First Blog Post', description: 'This is the first blog post.' },
           { id: '2', title: 'Second Blog Post', description: 'This is the second blog post.' },
       ];

       return (
           <div>
               <h1>My Blog</h1>
               <ul>
                   {blogPosts.map((post) => (
                       <li key={post.id}>
                           <Link href={`/posts/${post.id}`}>
                               <a>{post.title}</a>
                           </Link>
                       </li>
                   ))}
               </ul>
           </div>
       );
   }
   ```

2. **添加博客详情页**  
   在 `pages/posts/[id].tsx` 中添加动态路由，显示每篇博客的内容：

   ```typescript
   import { useRouter } from 'next/router';

   export default function Post() {
       const router = useRouter();
       const { id } = router.query;

       return (
           <div>
               <h1>Blog Post {id}</h1>
               <p>This is the content of post {id}.</p>
           </div>
       );
   }
   ```

---

## **2. 通过接口获取博客数据**

### **创建 Mock API**
在 `pages/api/posts.ts` 中添加 API 路由，返回模拟的博客数据：

```typescript
import { NextApiRequest, NextApiResponse } from 'next';

const blogPosts = [
    { id: '1', title: 'First Blog Post', description: 'This is the first blog post.' },
    { id: '2', title: 'Second Blog Post', description: 'This is the second blog post.' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(blogPosts);
}
```

### **从接口获取数据**
修改首页组件，通过 `getStaticProps` 获取数据：
```typescript
export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/posts');
    const blogPosts = await res.json();

    return {
        props: {
            blogPosts,
        },
    };
}
```

---

## **3. 添加股票历史数据查询功能**

### **股票查询页面**
在 `pages/stock.tsx` 中创建查询页面，允许用户输入股票 ID 并查询数据：
```typescript
import { useState } from 'react';

export default function StockQuery() {
    const [stockId, setStockId] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchStockData = async () => {
        const res = await fetch(`/api/stock?stockId=${stockId}`);
        const result = await res.json();
        setData(result);
    };

    return (
        <div>
            <input value={stockId} onChange={(e) => setStockId(e.target.value)} />
            <button onClick={fetchStockData}>Query</button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
```

### **创建股票数据 API**
在 `pages/api/stock.ts` 中添加路由，通过东方财富 API 获取数据：
```typescript
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { stockId } = req.query;
    const url = `https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=${stockId}&fields1=f1&fields2=f51`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
}
```

---

## **4. 部署到 Cloudflare Pages**

### **配置部署**
1. 推送代码到 Git 仓库：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <你的仓库地址>
   git push -u origin main
   ```

2. 在 Cloudflare Pages 上创建项目：
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
   - 点击 **Pages** > **Create a project**。
   - 选择你的 Git 仓库，配置构建设置：
     - **Framework preset**：Next.js。
     - **Build command**：`npm run build`。
     - **Build output directory**：`.vercel/output/static`。

3. 部署完成后，你的博客应用将在 Cloudflare 提供的子域名上运行！

---

通过上述步骤，你不仅实现了博客的基础功能，还集成了动态数据接口和股票查询功能，并成功部署到 Cloudflare Pages。希望这篇教程对你有所帮助！
