# uni-app接入第三方登录（微信、AppleId、手机号一键登录）
-- Author： rookieLink  
-- Date：2021-06-26  

本文档旨在阐述接入第三方登录的详细流程，避免重复踩坑

uni官方文档地址：https://uniapp.dcloud.io/api/plugins/login
文档中的API我们目前只看两个：uni.login()、 uni.closeAuthView()。第二个用于关闭一键登录弹窗

```javascript
uni.login(OBJECT)

// 如果要在这里面用到this，请用一个变量保存下来，类似 const that = this，愿意自己去了解this指向问题
OBJECT: {
  provider: '', // 登录提供商，uni.getProvider获取，getProvider是只要你配置了就会返回
  // 我们即将用到的手机号、微信、appleId登录传参分别是： ’univerify‘、’weixin‘、’apple‘
  success(res) {},  // 成功回调
  fail(res) {}, // 错误回调
}

```

## 提前通用配置
首先要配置manifest文件（我这里只列举该功能需添加的）， 其中android的sdk可以不用配置，通过设置自动添加进行自动勾选
``` json
{
  "app-plus" : {
    /* 模块配置 */
    "modules" : {
      // 加上授权
        "OAuth" : {}
    },
    /* 应用发布信息 */
    "distribute" : {
      "android" : {
        "permissions" : [
          "<uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\"/>",
          "<uses-permission android:name=\"android.permission.ACCESS_WIFI_STATE\"/>",
          "<uses-permission android:name=\"android.permission.MODIFY_AUDIO_SETTINGS\"/>",
          "<uses-permission android:name=\"android.permission.MODIFY_PHONE_STATE\"/>",
        ]
      },
      /* ios打包配置 */
      "ios" : {
        /* SDK配置 */
        "sdkConfigs" : {
          "oauth" : {
            "apple" : {},
            "univerify" : {},
            "weixin" : {
              // 这里是对应开放平台申请的appid和秘钥，记住一定要记住appsecret秘钥，否自重新获取会导致线上无法使用
              "appid" : "",
              "appsecret" : "",
              "UniversalLinks" : ""
            }
          }
        },
      }
    }
  }
}
```

鉴于登录方式的特殊性，我们将第三方登录分为两种方式：手机号一键登录、其他登录方式；所以加下来我会分两个大方向讲述如何进行具体接入

## 手机号一键登录
我们借助uni底层封装的功能，uni和三大运营商进行的合作，我们每次进行一键登录，消耗在0.02元，并且在每次解析成功才会扣费

#### 接入准备
手机号一键登录开发前的准备主要有以下三步：
##### 1、开通应用的一键登录功能
在DCloud开发者后台申请开通一键支付功能并充值一定金额；然后添加应用，填写对应的应用ID，及苹果和安卓的信息，注意，这里一个信息都不要落下，正确填写，否则后面紧急发版的却必须要等待审核的时候会非常痛苦  

这里有一个ApiKey和ApiSecret我们后续在写解析一键登录信息的云函数会用到

##### 2、开发云函数
云函数的开发方式就不详细讲了，有兴趣自己去看一下官方文档。首先在HBuilder中右键项目“创建uniCloud云开发环境”，然后关联到我们项目的服务  
然后会多出来一个uniCloud目录，在该目录的cloudfunctions文件夹下创建自己的云函数目录和文件，目录名上传部署后为函数名，一个目录下只放一个index.js文件，我们的代码写在这个文件里面。
```javascript
  // 下面仅展示客户端使用post方式发送content-type为application/json请求的场景
  exports.main = async(event) => {
    let body = event.body
    if(event.isBase64Encoded) {
      body = Buffer.from(body,'base64')
    }

    // 具体参数咋传看你们协商，这里只是示例
    const {
      access_token,
      openid
    } = JSON.parse(body)

    const res = await uniCloud.getPhoneNumber({
      provider: 'univerify',
      appid: '', // DCloud appid，不同于callFunction方式调用，使用云函数Url化需要传递DCloud appid参数！！！
      apiKey: '', // 在开发者中心开通服务并获取apiKey
      apiSecret: '', // 在开发者中心开通服务并获取apiSecret
      access_token: access_token,
      openid: openid
    })

    return {
      ...res
    }

  }
```
右键点击该目录上传部署

##### 3、配置云函数的url访问路径供后端使用
登录uniCloud云服务空间进行云函数的管理，点进去具体的服务空间后发现我们的云函数中会多出来刚刚上传部署的函数

点击详情在最下面点击编辑对url的path部分进行设置，按照要求设置完成后将当前的url复制给后端，作为后端调用云函数的方式

#### 具体实现
调用相对来讲就比较简单了，使用uni自带的login进行访问，代码如下：
```javascript
  uni.login({
    provider: 'univerify',
    univerifyStyle: { // 自定义登录框样式
    //参考`univerifyStyle 数据结构`
      otherLoginButton: {  
        visible: false, // 是否显示其他登录按钮，默认值：true
      }, 
    },
    success(res) { // 登录成功
      uni.closeAuthView();  // 登录成功后关闭一键登录的弹窗
      const result = res.authResult;
      // 向后端请求接口，由后端去请求我们的云函数
      // ...
    },
    fail(res) {  // 登录失败
      uni.closeAuthView();
      console.log('本机号码登录失败', res)
    }
  })
```

至此，我们便完整的实现了手机号一键登录的功能

## 其他方式登录（以微信和appleId登录为例）
因为根据IOS最新的规定，使用第三方登录必须要提供AppleID登录的功能，所以要一起实现，可以根据平台来判断显示不显示appleId登录的入口

#### 接入准备

##### 1、去微信开放平台配置android和ios登录的信息
首先要申请允许微信登录的接口，然后在下面的开发配置中，设置android和ios平台信息要完整，避免不必要的意外
** 注意：
- Universal Links和 项目manifest的配置要保持一致  
- android和ios的包名、bundleID要和Dcloud申请一键登录的那里要一致（也是我们在apple开发者中心申请的那个com.形式的bundle ID）
- android应用配置中的应用签名是keystore的md5签名

#### 2、申请appleID登录权限
在apple开发者中心对应的应用申请appleId的登录权限，然后去重新生成Profile文件，打包的时候用最新的Profile  

#### 具体开发
调用微信登录和appleId登录的方式可以用同一个，代码如下：
``` javascript
  uni.login({
    provider: 'weixin' | 'apple',
    success(res) {
      console.log('登录成功', res)
      const result = res.authResult
      // 向后端请求接口
      // ...
    },
    fail(res) {
      console.log('登录失败', res)
    }
  })
```

至此，微信和AppleId登录也开发完成了

## 总结
大家可以看到，最终真正调用登录的代码和处理都非常简单，主要的点在于调用之前所有的准备，少了一步，配置错了一点，都不会调用成功  

最终完整的实现手机号登录和第三方登录，进行了大量的搜索和摸索测试，中间也被一些不良博文带偏过；如何正确的搜索问题，得到自己想要的答案，高效处理当前问题很重要，面向浏览器编程何尝不是一种能力呢  

踩坑的路任重而道远，大家加油