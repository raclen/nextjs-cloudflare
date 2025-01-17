---
date: 2016-11-24 15:37
status: public
title: 简单说一下react
---

首先，复杂的配置，编译插件安装，很麻烦，我找了一个脚手架 [Create React App](https://github.com/facebookincubator/create-react-app)来写
安装使用
```
npm install -g create-react-app

create-react-app my-app
cd my-app/
npm start
npm run build（打包）
```    
安装完，大概是这样，还是比较简洁的，但是功能很强大，各种编译插件，热加载，打开浏览器都有，src里面可以再细分一下文件夹
![](~/15-55-52.jpg)
写的demo是这样一个功能
![](~/cute.gif)

index>app>box>liview
使用的ES6的写法，用到了状态管理，事件绑定，组件通讯，react好像也就这些东西了
下面是我刚学的时候做的笔记
```
ES5语法
一切从这开始
把组件塞进去
ReactDOM.render(<Main />，document.getElementById('warp'),function(){
//回调函数
})
第一个参数 组件名字，第二个容器dom，第三个回调函数
其中第一个组件 传参数有两个写法
var obj ={
    name : "九木旭",
    address:"上海"
}
<Main name="九木旭" address=“上海” />
<Main {...obj }/>//ES6的语法糖写法
tips：组件名字一定要大写
定义一个组件
var Main = React.createClass({})
组件里面有几个核心的方法，下面来看看
var Main = React.createClass({
    //储存状态，核心函数，非必须，就像一个状态机，一个地方改变它的值，其他使用的地方自动发生变化
    1.通过属性往组件里面传值，是通过this.props接收
    getInitialState:function(){
        return{
            obj:this.props.obj
       }
   },
   //组件初始化函数
    1.可以用于加载完了请求接口把数据塞到state里，然后刷新组件
    2. 也可以组件通讯的时候发布事件,那就需要用到这个插件pubsub.js
   componentDidMount:function(){
    //添加数据到state
    this.setState({
     obj:newobj
   })
  //声明一个事件
    bind(this)是为里面的this制定this对象，当然不这样也行
    PubSub.subscribe(“delectItem”,function (evName,data){
        data 为传入的id
   }.bind(this))	
   //触发一个事件
    PubSub.publish("delectItem",id);

   },
    //核心并且必须的方法
    render:function(){
        //render 要注意
        1.class 换成className
        2.行内样式用如下写法，JSX语法规则
        3.只能有一个标签
        4.使用ref 来给元素取名字就像ID一样，通过this.refs.txt即可访问           
render(
           <div>
                <h1 style={{display:"none"}}></h1>
                <p className=""></p>
                <input ref="txt" />
           </div>
       )
   }
    
})
//当遍历的时候 需要制定key 不要会报错，例如
  this.props.listArr.map(function (item,index){
	return <ItemComponent key={index} {...item} />
  })

组件之间通讯除了使用插件pubsub外，也可以使用属性传递的方式，定义一个函数，传递下去，在第一个组件里面执行，通过传参即可通讯
```
下面贴上box和liview的代码
```javascript
//box.js
import React, {Component} from 'react';
import Liview from './Liview';

class Box extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }

    }

    inputKeyDownfn(e) {
        console.debug(e.keyCode);
        if (e.keyCode === 13) {

            let val = e.target.value;

            this.state.list.push({
                _id: new Date().getTime(),
                content: val

            });
            this.setState({
                list: this.state.list
            });

            this.refs.txt.value = '';
        }

    }

    delectItem(id) {
        console.log('id====' + id);
        console.log(this);
        var newlist = this.state.list.filter(function (item, i) {
            return id !== item._id;
        })

        this.setState({list: newlist});

    }

    render() {
        console.log('common box render')
        var isShow = this.state.list.length > 0 ? 'block' : 'none';
        return (
            <section>
                <input type="text" ref="txt" placeholder="输入内容" onKeyDown={this.inputKeyDownfn.bind(this)}/>
                <ul style={{display: isShow}}>
                    {
                        this.state.list.map(function (item, index) {
                            return <Liview {...item} key={index} delectItem={this.delectItem.bind(this)}/>
                        }.bind(this))
                    }

                </ul>
            </section>
        )

    }

}
export default Box;

```
```javascript
//liview.js
import React, {Component} from 'react';

class Liview extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        console.log('common liview render');
        return(
            <li id={this.props._id}>{this.props.content}<a href="javascript:;" onClick={this.delItemFn.bind(this)}>删除</a></li>
        )
    }
    delItemFn(){
        console.log("item del");
        this.props.delectItem(this.props._id);
    }
}

export default Liview;

```
可以看出ES5和ES6的react的写法差别还是很大
写下来留个印象，下次如果用上，来抄一下，主要是语法得随着它来