//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var util = require('./utils/util')

App({
  globalData: {
    userInfo: null,
    sessionKey: '',
  },
  onLaunch: function () {
    qcloud.setLoginUrl(config.service.loginUrl),
      this.login()
      wx.getWeRunData({
        
      })
  },
  // 用户登录示例
  login: function () {
    
    var that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: config.service.loginUrl,
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
             
              wx.setStorageSync('sessionKey', res.data.data.sessionKey)
              wx.setStorageSync('userId', res.data.data.userId)
              if(res.data.code == 5001){
                wx.getUserInfo({
                  success:function(data){
                    wx.request({
                      url: config.service.loginInfo,
                      data: {
                        sessionKey: res.data.data.sessionKey,
                        rawData: data.rawData,
                        signature: data.signature,
                        encryptedData: data.encryptedData,
                        iv: data.iv
                      },
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: function (res) {
                        wx.setStorageSync('userId', res.data)
                      }
                    })
                  }
                })
                
              }else{

                console.log('登录成功')
              }
              that.globalData.userId = res.data.data;
              if (res.data.code == 200) {
                wx.setStorageSync("sessionId", res.data.data.sessionId);
              } else {
                //wx.setStorageSync("sessionKey", res.data.data.sessionKey);
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })

  }
 
})
