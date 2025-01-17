---
date: 2017-01-03 17:51
status: public
title: 记一下vuejs
---

关注Vue也很久了，第一次知道它，对它的印象是小，只有18K。
下面通过这几个例子来介绍它，基于目前最新版本的vue2.X

![](~/17-10-02.jpg)a

[https://github.com/raclen/jsCode/tree/master/vuejs](https://github.com/raclen/jsCode/tree/master/vuejs)
tips
有的时候 不光模板里面需要用到props里面的值，在methods里面也需要用到，在这我们就可以初始化props的值
```javascript
props: ['initialCounter'],
data: function () {
  return { counter: this.initialCounter }
}
```
定义一个计算属性，处理 prop 的值并返回。
这个也很好用，比如服务端给的数据为
`"value": "[\"老人身份证\",\"残疾人证\",\"导游资格证\"]",`
我们需要对这个value处理一下 在显示，就可以使用以下代码
在模板里面这样写{{normalizedSize}}
```javascript
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```
下面是vue生命周期

![](~/VueYY.jpeg)
非父子组件通信
var bus = new Vue()a

// 触发组件 A 中的事件
bus.$emit('id-selected', 1)

// 在组件 B 创建的钩子中监听事件
bus.$on('id-selected', function (id) {
  // ...
})
computed用于计算属性(当前data没有某个值，计算出一个值后，取法就像去data里面的值)
用过一段时间vue你可能会发现 短时间内改变某个值无效
这是vue的Tick机制，我们可以这样写
```javascript
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: 'not updated'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = 'updated'
      console.log(this.$el.textContent) // => '没有更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => '更新完成'
      })
    }
  }
})
```

整体感觉，语法丰富灵活，生态好（比react中文资料多，相比较angular2，提起来的不多了），没有编译模板之类，入门容易，还是觉得有点随意，0.9->1.X->2.X都变化很大，不向下兼容，对后期维护人员不友好

### 参考链接
[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)
[vue-router 60分钟快速入门](http://www.cnblogs.com/keepfool/p/5690366.html)
[vue中文文档](https://cn.vuejs.org/v2/guide/events.html)
[https://router.vuejs.org](https://router.vuejs.org/zh-cn/essentials/navigation.html)
### 扩展阅读
[自定义事件](https://github.com/Kelichao/vue.js.2.0/issues/19)
[详解vue的数据binding原理](http://www.cnblogs.com/dh-dh/p/5606596.html#3642766)
[Vue学习：生命周期](http://www.charlycheng.xyz/2016/12/13/Vue%E5%AD%A6%E4%B9%A0%EF%BC%9A%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F/)