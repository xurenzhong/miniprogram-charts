
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },

  globalData: {
    userInfo: null,
    root: "https://bluegull.cn"
    // root: "http://106.14.221.12"
  }
})