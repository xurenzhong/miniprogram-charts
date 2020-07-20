var http = require('./libs/httputils.js')

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId。并缓存
        console.log("微信CODE："+res.code);
        var params = {
          Wxcode:res.code
        }
        // 发起请求
        // http.postRequest("http://106.14.221.12/login.do", params, function(res) {
        //   wx.setStorageSync('Session_key', res.Session_key)
        //   wx.setStorageSync('Telnum', res.Telnum)
        //   console.log("注册成功")
        // }, function(err) {
        //   console.log("注册失败："+err)
        //   wx.clearStorageSync()
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    // root: "http://bluegull.cn"
    root: "http://106.14.221.12"
  }
})