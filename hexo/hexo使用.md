### hexo使用全纪录

### `hexo初始化`

> hexo init \[folder\]

### `生成相应文件`

> hexo new \[layout\] \<title\>

**各种情况：**

加不加page的区别：

首先title中间有空格之类的要加上双引号，不加page会默认在_config.yml 中default_layout指定的默认目录下创建文件，不管有没有重新指定过--path

如果没有指定目录，hexo会根据title来生成文章路径

1、不加--path来进行

如果使用的是 hexo new "title"， 当前指令没有指定目录，会在 _config.yml 中default_layout指定的默认目录下创建title,md文件，并且文件的title为“title

2、通过指定--path

如果不指定title， 则默认title是page

hexo new page --path about/me "About me"

结果生成文件路径为  about/me.md   title是"About me"

hexo new page --path about/me

结果生成文件路径为  默认路径/about/me.md   title是 "page"

### `生成静态资源文件`
只会生成_posts目录下的文件
>hexo generate

### `发布草稿`

>hexo publish [layout] <filename>

这条命令是将_drafts目录下的文件发布到_posts文件夹下

### `启动服务器`
> hexo server

### `部署网站`

>hexo deploy

### `渲染文件`

>hexo render

### `从其他地方迁移博客`

> hexo migrate

### `列出网站资料`

> hexo list

### `显示hexo版本`

> hexo version

