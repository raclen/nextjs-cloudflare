---
date: 2016-06-20 15:18
status: public
title: angular指令
---

前端组件化，angular指令可以帮到我们
指令还是比较复杂，它 一共有这么多参数，先写到这，我只明白其中几个
```
restrict: string,//指令的使用方式，包括标签，属性，类，注释
priority: number,//指令执行的优先级
template: string,//指令使用的模板，用HTML字符串的形式表示
templateUrl: string,//从指定的url地址加载模板
replace: bool,//是否用模板替换当前元素，若为false，则append在当前元素上 transclude: bool,//是否将当前元素的内容转移到模板中
scope: bool or object,//指定指令的作用域
controller: function controllerConstructor($scope, $element, $attrs, $transclude){...},//定义与其他指令进行交互的接口函数
require: string,//指定需要依赖的其他指令
link: function postLink(scope, iElement, iAttrs) {...},//以编程的方式操作DOM，包括添加监听器等
compile: function compile(tElement, tAttrs, transclude){
            }//编程的方式修改DOM模板的副本，可以返回链接函数
```
restrict
<table>
<thead>
<tr>
<th>值</th>
<th>对应类型</th>
<th>使用方法</th>
</tr>
</thead>
<tbody>
<tr>
<td>E</td>
<td>element</td>
<td><code>&lt;people&gt; &lt;/people&gt;</code></td>
</tr>
<tr>
<td>A</td>
<td>attribute</td>
<td><code>&lt;div people&gt; &lt;/div&gt;</code></td>
</tr>
<tr>
<td>C</td>
<td>class</td>
<td><code>&lt;div class="people"&gt; &lt;/div&gt;</code></td>
</tr>
<tr>
<td>EAC</td>
<td>-</td>
<td>以上三种都可使用</td>
</tr>
</tbody>
</table>
我比较喜欢用“E”看起来简洁，高大上
看不懂没关系，写几个应该慢慢就懂了

![](~/15-40-50.jpg)
这个菜单，用指令怎么写的
```javascript
    directives.directive('menu', ['$location', function ($location) {
        return {
            restrict: 'EA',
            replace: true,
            template: '<ul>'+
'                <li><a ng-href="#/home/001">人生智慧</a></li>'+
'                <li><a ng-href="#/home/002">每日一文</a></li>'+
'                <li><a ng-href="#/home/004">原创分享</a></li>'+
'                <li><a ng-href="chat.html">在线聊天</a></li>'+
'                <li><a ng-href="#/feedback">意见反馈</a></li>'+
'            </ul>',
            link: function(scope, element, attrs ) {
            	console.log(scope)
                var path = $location.path();
                var $li = $(element[0]).find('li');
                switch (path){
                    case '/home/001':
                        $li.eq(0).find('a').addClass('active');
                        break;
                    case '/home/002':
                        $li.eq(1).find('a').addClass('active');
                        break;
                    case '/home/004':
                        $li.eq(2).find('a').addClass('active');
                        break;
                    default :
                        break;

                }


            }
        }
    }]);
```
```html
//页面上
<menu></menu>
```
这里注入了$location，用来获取path
再写一个
每次ajax加载之前需要一个loading，这个怎么写成组件呢
```javascript
  directives.directive('loading',function(){
        return {
            restrict:"EA",
            replace : true,
            template :'<section class="mod model-3" ng-if="loading"> <div class="spinner"> </div> </section>',
            link :function(scope, element, attrs){

            }
        }

    })
```
```html
<loading></loading>
```
使用的时候，只需要给loading赋值true或者false
这些都还是比较简单，我看看怎么写个复杂的
思考了一下发现清晨好文章没有这样的需求
关于 指令中的scope 用法，推荐看这篇文章  [ 玩转 AngularJS 指令的 Scope (作用域)](https://segmentfault.com/a/1190000002773689)
其实就是在指令标签中通过属性把值传给指令，然后在指令中使用，就像是个性参数一样
```javscript
<div nav navback="true" navtitle="首页" navurl="#city" title="团购券详情"></div>
```
比如这个nav指令，这里传入了navback，navtitle，navurl，title这几个属性
PS：我们也可以不用驼峰命名，直接都小写，就行，因为这个驼峰命令，看到我稀里糊涂
angular指令学到这里差不多可以干活了