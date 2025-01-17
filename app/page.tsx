import React from 'react';
import { Card } from 'antd';

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card style={{ width: 300, textAlign: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <a href="/blog" style={{ fontSize: '18px', color: '#1890ff' }}>Blog</a>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <a href="/stock" style={{ fontSize: '18px', color: '#1890ff' }}>Stock</a>
        </div>
        <div>
          <a href="/zone" style={{ fontSize: '18px', color: '#1890ff' }}>Zone</a>
        </div>
      </Card>
    </div>
  );
}