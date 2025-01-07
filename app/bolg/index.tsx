import Link from 'next/link';

type BlogPost = {
    id: string;
    title: string;
    description: string;
};

type Props = {
    blogPosts: BlogPost[];
};

export default function Home({ blogPosts }: Props) {
    return (
        <div style={{ padding: '20px' }}>
            <h1>My Blog</h1>
            <ul>
                {blogPosts.map((post) => (
                    <li key={post.id} style={{ marginBottom: '10px' }}>
                        <Link href={`/posts/${post.id}`}>
                            <a>
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// 使用 getStaticProps 获取数据
export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/posts'); // 部署后替换为 Cloudflare Pages 的域名
    const blogPosts: BlogPost[] = await res.json();

    return {
        props: {
            blogPosts,
        },
    };
}
