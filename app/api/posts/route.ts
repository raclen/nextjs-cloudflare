
import { NextResponse } from 'next/server';

const blogPosts = [
    { id: '1', title: 'First Blog Post', description: 'This is the first blog post.' },
    { id: '2', title: 'Second Blog Post', description: 'This is the second blog post.' },
];


// 处理 GET 请求
export async function GET() {
    return NextResponse.json(blogPosts);
}