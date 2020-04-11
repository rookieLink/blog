# animation笔记
参考：
阮一峰的个人博客：
http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html

## 1、基本用法

首先，CSS Animation需要指定动画一个周期持续的时间，以及动画效果的名称。

```css
div:hover {
  animation: 1s rainbow;
}
```

上面这个代码表示，当div的hover样式，产生持续1s，名为rainbow的动画，然后我们用@keyframe来定义这个动画:

```css
@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
```

默认情况下动画只播放一次，可以使用infinite或者具体数字进行播放次数定义
```css
div:hover {
    /*播放无限次*/
    animation: 1s rainbow infinite;
    /*播放三次*/
    animation: 1s rainbow 3;
}
```

## 2、animation-fill-mode

动画结束后，会立即从结束状态变到起始状态，如果想保留在结束状态，需要使用到animation-fill-mode属性：
```css
div:hover {
  animation: 1s rainbow forwards;
}
```

forwards会使状态保留在结束状态

animation-fill-mode其他的一些属性值：
- none 动画回到未开始的状态
- forwards 动画保留最后一帧的状态
- backwards 动画第一帧的状态(如果设置有delay， 则会显示第一帧的效果)
- both 根据animation-direction 轮流应用forwards和backwards规则

## 3、animation-direction

动画播放的方向，默认值为normal，最常用的就是normal和reverse；
- normal
- alternate
- reverse
- alternate-reverse

## 4、animation的各项属性
animation的属性和transition比较像，可以写成简写形式，也可以全写；
```css
div:hover {
  animation: 1s 1s rainbow linear 3 forwards normal;
}
```
等价于
```css
div:hover {
  animation-name: rainbow;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 1s;
  animation-fill-mode:forwards;
  animation-direction: normal;
  animation-iteration-count: 3;
}
```

## 5、@keyframe的写法

可以用“%”，也可以将0%、100%用from、to来代替，如果省略中间状态，会自动推算中间状态；

并且，可以把多个状态写在同一行：
```css
@keyframes pound {
  from，to { transform: none; }
  50% { transform: scale(1.2); }
}
```

浏览器从一个状态跳转到另一个状态是平滑过渡的，可以使用step函数进行分步过渡：
```css
div:hover {
  animation: 1s rainbow infinite steps(10);
}
```

## 6、animation-play-state

动画播放过程中，如果突然停止，则动画会回到原来的状态，如果想要动画保持在终止时的状态，需要用到animation-play-state属性
```css
div {
    animation: spin 1s linear infinite;
    animation-play-state: paused;
}

div:hover {
  animation-play-state: running;
}
```

上面的代码示例，没有鼠标悬停的时候，保持在鼠标离开时候的状态，当鼠标悬停时，继续从上次的状态开始播放动画。

## 7、兼容性
注意：下面这句话是阮一峰在2014年说的，现在的chrome应该也是支持animation不加前缀的写法的。

目前，IE 10和Firefox（>= 16）支持没有前缀的animation，而chrome不支持，所以必须使用webkit前缀：
```css

div:hover {
  -webkit-animation: 1s rainbow;
  animation: 1s rainbow;  
}

@-webkit-keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}

@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
```
