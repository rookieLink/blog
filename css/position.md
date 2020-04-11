五种方式：
- 1、static 默认 没有top、bottom、right、left配置
- 2、absolute
绝对定位，定位之后不占有原来的位置，基于父级第一个是相对定位的元素进行定位，如果没有，则根据body进行定位
- 3、relative
相对定位，占有原有位置，根据原本的位置进行偏移设置
- 4、fixed
固定定位，不管页面如何变化，都不会改变fixed的位置
- 5、 sticky（翻译：粘的，粘性的）
占据原来的位置，当页面超出一定位置时，以设置的top、right、left、bottom为准