"use client"; // 必须在文件顶部声明

import Link from 'next/link';
import react, { useState, useEffect } from 'react';
export const runtime = 'edge';

type BlogPost = {
    id: string;
    title: string;
    description: string;
};



export default function Home() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);


    const getStaticProps = async ()=> {
        const res = await fetch('/api/posts'); // 部署后替换为 Cloudflare Pages 的域名

        console.log(res);
        
        const blogPosts1: BlogPost[] = await res.json();
        setBlogPosts(blogPosts1)
    }

    useEffect(() => {
        getStaticProps()
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>My Blog</h1>
            <ul>
                {blogPosts.map((post) => (
                    <li key={post.id} style={{ marginBottom: '10px' }}>
                        <Link href={`/posts/${post.id}`} legacyBehavior>
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


