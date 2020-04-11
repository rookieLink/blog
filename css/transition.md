# transition笔记
参考：
阮一峰的个人博客：
http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html

#### 1、在指定transition之前，是css没有时间轴的概念的
```css
img {
    width: 100px;
    height:100px;
}

img:hover {
    width: 200px;
    height: 200px
}
```
在这之前，效果是瞬间变大，而使用transition后，将有一个过渡过程。
```css
img {
    transition: 1s;
    /*指定过渡属性*/
    transition: 1s width;
}
```

#### 2、transition-delay
首先transition是可以指定多组属性变换的
```css
img {
    transition： 1s width, 1s height;
}
```

如果我们想要height在width完成之后，或者延迟某个具体的时间之后进行变换，可以使用这个属性（第二项为延迟属性）

```css
img {
    transition： 1s width, 1s 1s height;
}
```
delay真正的意义在于，他指定了动画的顺序，使得多个不同的transition可以连在一起，形成复杂动画

#### 3、transition-timing-function
transition动画变化速度（timing function），默认不是匀速的，而是逐渐放慢，也就是ease
```css
img{
    transition: 1s ease;
}
```
还有其他几种变换方式：
- linear    匀速
- ease-in   加速
- ease-out  减速
- cubic-bezier函数  自定义模式

```css
img{
    transition: 1s height cubic-bezier(.83,.97,.05,1.44);
}
```
#### 4、transition的各项属性

```css
img {
    transition: 1s 1s width ease;
}
```
这是一个简写形式，可以定义成各个属性:
```css
img {
    transition-property: height;
    transition-duration: 1s;
    transition-delay: 1s;
    transition-timing-function: ease;
}
```
#### 5、transition使用注意点
1、不是所有浏览器都支持，IE10以上基本都支持了该属性
2、不是所有属性都支持transition
3、transition需要知道具体开始状态和结束状态的值，才能计算出来中间状态，比如0px-auto， display:none-display:block无法计算出来中间状态的值

#### 6、transition的局限
transition优点在于简单易用，但是也有一定的局限性：
- 1、transition只能通过事件触发，不能再网页加载是自动发生
- 2、transition是一次性的，不能重复发生，除非多次触发
- 3、transition只能定义开始状态和结束状态，无法定义中间状态
- 4、一组transition规则，只能定义一个属性变化，无法定义多个属性变化

因为这些局限性，css Animation就是为了解决这些局限。