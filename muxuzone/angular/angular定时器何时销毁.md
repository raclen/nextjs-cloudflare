---
date: 2016-06-20 14:30
status: public
title: angular定时器何时销毁
---

### 标题
- 在清晨好文章中，给li绑定了一个定时器，每隔三秒给他下一个li加一个样式

![](~/timer.gif)

```javascript
  function Animate() {
            this.timer  = null;
            this.step = 0;
        }

        Animate.prototype.set = function () {
            var that = this;
            that.timer  = $interval(function () {
                var li = $('#ul-list li');
                if ( that.step == li.length) {
                    that.step = 0;
                }
                li.removeClass('ani');
                li.eq( that.step).addClass('ani');
                that.step++;
            }, 3000)
        };
        Animate.prototype.cancel = function () {
            $interval.cancel(this.timer);
        }
        //调用
        var liAnimate = new Animate();
        liAnimate.set();
```

但是什么时候清除定时器呢
你可能想到，我在调用之前清除

```javascript
liAnimate.cancel();
liAnimate.set();
```
试过之后就知道不对了
正确的做法是在DOM从页面删除的时候销毁

```javascript
//当DOM元素从页面中被移除时，AngularJS将会在scope中触发$destory事件。这让我们可以有机会来cancel任何潜在的定时器
  $scope.$on("$destroy", function( event ) {
                liAnimate.cancel();
            }
        );
```