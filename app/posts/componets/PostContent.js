"use client"; // 声明为 Client Component

import { useEffect } from 'react';

export default function PostContent({ content }) {

  /**
 * 初始化代码块的复制按钮
 * @param {string} selector - 用于选择代码块的 CSS 选择器，例如 'pre'
 */
const initCopyCodeButtons=(selector = 'pre')=> {
  // 获取所有匹配的代码块
  const codeBlocks = document.querySelectorAll(selector);

  codeBlocks.forEach((block) => {
    // 确保每个代码块只有一个复制按钮
    if (block.querySelector('.copy-button')) return;

    // 创建按钮
    const button = document.createElement('button');
    button.innerText = '复制代码';
    button.className = 'copy-button';
 

    // 点击事件：复制代码到剪贴板
    button.addEventListener('click', () => {
      const code = block.querySelector('code').innerText;
      navigator.clipboard.writeText(code).then(
        () => {
          button.innerText = '复制成功';
          setTimeout(() => (button.innerText = '复制代码'), 2000);
        },
        () => {
          button.innerText = '复制失败!';
        }
      );
    });

    // 将按钮插入到代码块中
    block.style.position = 'relative'; // 确保按钮能正确定位
    block.appendChild(button);
  });
}
  useEffect(() => {
    // 初始化复制代码按钮
    initCopyCodeButtons();
  }, []);

  return (
    <div className="markdown">
      {/* 渲染传递的内容 */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
