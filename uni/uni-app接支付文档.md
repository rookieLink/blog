# uni-app接入支付指南（微信及支付宝）
-- Author： rookielink  
-- Date：2021-06-26  

只做接入微信及支付宝支付拉起方式，未做ios支付拉起支持

#### 参考文档：
https://uniapp.dcloud.io/api/plugins/payment?id=requestpayment

使用方式：
```javascript
uni.requestPayment({
    provider: 'alipay', //  provider  微信支付：wxpay  支付宝支付：alipay
    orderInfo: 'orderInfo', //微信、支付宝订单数据 微信支付是一个对象，支付宝支付是一个字符串
    success: function (res) {
        console.log('支付成功:' + JSON.stringify(res));
    },
    fail: function (err) {
        console.log('支付失败:' + JSON.stringify(err));
    },
    complete: function() {
      console.log('无论支付结果如何，都会执行')
    }
});
```

#### 注意：  
orderInfo信息由后端返回，格式大致如下  
###### 支付宝支付：
```javascript
{
  provider: 'alipay',
  orderInfo:  `app_id=2021002100613306&biz_content=%7B%22subject%22%3A%22Sarah+%E9%A3%8E%E7%90%B4%E8%A4%B6+%E9%95%9C%E9%9D%A2+%E6%8B%89%E9%93%BE+%E9%95%BF%E6%AC%BE%E9%92%B1%E5%8C%85%E7%81%AB%E8%8D%AF%E9%9D%92%22%2C%22out_trade_no%22%3A%22PSM202106251134566786%22%2C%22total_amount%22%3A%22123.00%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22timeout_express%22%3A%221m%22%7D&charset=utf-8&format=JSON&method=alipay.trade.app.pay&notify_url=https%3A%2F%2Fproduct-split-test.turingsenseai.com%2Fapi%2Fv2%2Fmall%2Forder%2FalipayNotify&sign=jc9uvZWWHF2e1xkzQHdh4pW4gOoLIcgl%2BQiyfBS8jFDhSmVMEVlooZxpAKvC6gpXDoUMr81q50nIlRx2JI6HoJ%2FxVXkyM%2FaDQjFYHvWezlzBjZvY5bk%2FiUfD2KdHBC0TDol82OYkz1IEQQJ71rzoXIpkfWq6D0Fh4wN%2F5JihSugPXhIEFuh6UkMBHHVcIlSqwnVvgu1p4m5DsvAlJpqfuECoH2YzL6%2FILzrLdzQxgAlVPf19unhHQx5AAYiydfWAhraY1sVMaSeF8D2kDlxMN%2FWYq2kkP2pT2hpNgVEJpcg55UBYqnjD9YUv92NHE2Z%2FS%2BzDp0s6L%2FRTrBF%2BW0RgPA%3D%3D&sign_type=RSA2&timestamp=2021-06-25+11%3A35%3A03&version=1.0`
}
```

##### 微信支付:
** 【！！！注意】 这里orderInfo中的所有属性名必须是小写
```javascript
{
  provider: 'wxpay',
  orderInfo: {
    appid: 'wx336439508d336e22',
    noncestr: 'w3KXYZSGAzpofmMh',
    package: 'Sign=WXPay',
    partnerid: '1600290364',
    prepayid: 'wx2511380114152784b21c24239622c50000',
    sign: '3962AC7D46FB20EBBAD44737A74F6D2D',
    timestamp: '1624592280'
  }
}
```

#### 【重要】项目打包配置
需要勾选mainfest中支付选项，填写的appid必须和后台保持一致，需经过实名认证后生成一个连接，此链接开发版本可以使用测试版，发正式版建议使用公司的常规域名（当前未配置）

   

# 项目中调用支付指南（微信及支付宝）

支付功能封装源代码： 
```javascript
const payTypeMap = {
  wxpay: '微信',
  alipay: '支付宝',
}
/**
 * @function APP多类型支付功能封装
 * @param {string} provider 支付类型 'wxpay'/'alipay'
 * @param {string|object} orderInfo 订单信息，】微信是[object]{}】,    【支付宝是[string] ''订单数据 】
 * @param {successCallback, failCallback } 回调对象  属性： successCallback 成功回调  failCallback  失败回调
 */
export const uniPay = function(provider = '', orderInfo = '', {successCallback = () => {}, failCallback = () => {} } = {}) {
  uni.showLoading()
  payEnvCheck(provider).then(checkRes => {
    if (checkRes) {
      // TODO 拉起支付
      console.log(provider, orderInfo)
      uni.requestPayment({
        provider,
        orderInfo,
        success: () => {
          console.log
          uni.hideLoading()
          successCallback()
        },
        fail: (res) => {
          console.log('11', res)
          uni.hideLoading()
          failCallback()
        }
      })
    } else {
      uni.hideLoading()
      uni.showToast({title: `获取${payTypeMap[provider]}通道失败，请检查您的${payTypeMap[provider]}是否正常启用`, icon: 'none'})
      // failCallback()
    }
  }, err => {
    // 未检测到对应支付app
    uni.hideLoading()
    uni.showToast({title: `请安装${payTypeMap[provider]}后重新尝试`, icon: 'none'})
    // failCallback()
  })

}

/**
 * 校验环境
 * @param {string} payType 支付类型 'wxpay'/'alipay'
 * @returns promise 环境校验是否支持
 */
export const payEnvCheck = function(payType) {
  return new Promise((resolve, reject) => {
    uni.getProvider({
      service: 'payment',
      success: res => {
        console.log(res)

        if(res.provider.indexOf(payType) >= 0) {
          resolve(true)
        } else {
          resolve(false)
        }
      },
      fail: res => {
        reject()
      }
    })
  })

}
```
代码主要分为两个部分：  
1、环境校验--校验当前环境是否支持当前的支付方式，入参为支付类型  
2、拉起支付--直接拉起对应支付方式，入参为支付类型、订单信息、回调对象

### 具体调用方式示例
在代码中引入payment.js
```javascript
import { uniPay } from '[path]/payment'

//  先查询订单信息，参数为具体业务协定接口要求参数
// []内为提示信息
fetchAlipayMsg({orderNo: [orderNo], payType: [payType] })
  .then(res => {
    if (res && res.errorCode == 0) {
      // 调用支付接口
      uniPay(['wxpay'|'alipay'], [orderInfo], { successCallback: () => {
        uni.showToast({title: '支付成功', icon: 'success'})
        // TODO  执行支付成功操作
      }, failCallback: () => {
        uni.showToast({title: '支付失败', icon: 'none'})
        // TODO  执行支付失败操作
      }})
    }
  })

```
