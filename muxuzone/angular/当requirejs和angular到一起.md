---
date: 2016-04-08 09:54
status: public
title: 当requirejs和angular到一起
---

> angular的路由，过滤器，模板。这些功能我很喜欢
 requirejs对于没有模块化的js，AMD规范的js，以及，没有模块化和AMD规范的混合的 都支持，我觉得很好
起初使用requirejs 就是我们老大说的，一个页面引用一个js看起来干净，我也很赞同
r.js压缩其实很容易，前提是requirejs的依赖一定要写好，有时候，依赖不对，但是可以跑起来（在没有模块化的或者没有模块化和AMD混合中会出现），这时候使用r.js可以压缩，压缩后就跑不起来了
r.js中的paths和shim与入口函数的paths和shim一模一样

详细的配置可以参考[清晨好文章](https://github.com/raclen/raclen.github.io/tree/master/public)